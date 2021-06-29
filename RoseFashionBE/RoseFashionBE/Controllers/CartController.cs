using RoseFashionBE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RoseFashionBE.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CartController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetLastUsedCartID(string userid)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {

                    var oldcartid = entity.Carts.Where(c => c.UserID == userid && c.IsUsing == true).Select(c => c.CartID).FirstOrDefault();
                    if(oldcartid == null)
                    {
                        string newcartid = "CR-" + (entity.Carts.Count() + 1);
                        entity.Carts.Add(new Cart
                        {
                            CartID = newcartid,
                            UserID = userid,
                            IsUsing = true
                        });
                        entity.SaveChanges();
                        return Ok(newcartid);
                    }
                    return Ok(oldcartid);
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateCart(string cartid, CartModel[] items)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {
                    entity.Cart_Product.RemoveRange(entity.Cart_Product.Where(cp => cp.CartID == cartid).ToList());
                    entity.SaveChanges();
                    if (items.Length == 0) return Ok("OK");
                    for (int i = 0; i < items.Length; i++)
                    {
                        var oneitem = items[i];
                        entity.Cart_Product.Add(new Cart_Product
                        {
                            CartID = cartid,
                            ProductID = oneitem.ProductID,
                            Size = oneitem.Size,
                            Amount = oneitem.Amount,
                            SalePrice = oneitem.SalePrice,
                            OriginalPrice = oneitem.OriginalPrice
                        });
                    }
                    entity.SaveChanges();
                }
                return Ok("OK");
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetItemsInCart(string cartid)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {
                    /*var result = entity.Cart_Product.Where(cp => cp.CartID == cartid)
                             .Select(cp => new CartModel
                             {
                                 CartID = cp.CartID,
                                 ProductID = cp.ProductID,
                                 Name = cp.Product.Name,
                                 Image = cp.Product.Image,
                                 Size = cp.Size,
                                 Quantity = cp.Product.Product_Size_Quantity.Where(q => q.ProductID == cp.ProductID && q.Size == cp.Size).Select(q => q.Quantity).FirstOrDefault(),
                                 Amount = cp.Amount,
                                 SalePrice = cp.SalePrice,
                                 OriginalPrice = cp.OriginalPrice
                             }).ToList();*/
                    var checkusing = entity.Carts.Where(c => c.CartID == cartid).Select(c => c.IsUsing).FirstOrDefault();
                    List<CartModel> result = new List<CartModel>();
                    if (checkusing == true)
                    {
                        result = entity.Cart_Product.Where(cp => cp.CartID == cartid)
                             .Select(cp => new CartModel
                             {
                                 CartID = cp.CartID,
                                 ProductID = cp.ProductID,
                                 Name = cp.Product.Name,
                                 Image = cp.Product.Image,
                                 Size = cp.Size,
                                 Quantity = cp.Product.Product_Size_Quantity.Where(q => q.ProductID == cp.ProductID && q.Size == cp.Size).Select(q => q.Quantity).FirstOrDefault(),
                                 Amount = cp.Amount,
                                 SalePrice = cp.Product.Price - cp.Product.Price*cp.Product.DiscountPercent/100,
                                 OriginalPrice = cp.Product.Price
                             }).ToList();
                    }
                    else
                    {
                        result = entity.Cart_Product.Where(cp => cp.CartID == cartid)
                             .Select(cp => new CartModel
                             {
                                 CartID = cp.CartID,
                                 ProductID = cp.ProductID,
                                 Name = cp.Product.Name,
                                 Image = cp.Product.Image,
                                 Size = cp.Size,
                                 Quantity = cp.Product.Product_Size_Quantity.Where(q => q.ProductID == cp.ProductID && q.Size == cp.Size).Select(q => q.Quantity).FirstOrDefault(),
                                 Amount = cp.Amount,
                                 SalePrice = cp.SalePrice,
                                 OriginalPrice = cp.OriginalPrice
                             }).ToList();
                    }
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateProductQuantity(CartModel[] items)
        {
            try
            {
                bool success = UpdateQuantity(items);
                if (success == false) return BadRequest("Update fail.");
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        bool UpdateQuantity(CartModel[] items)
        {
            using (var entity = new RoseFashionDBEntities())
            {
                for (int i = 0; i < items.Count(); i++)
                {
                    string pid = items[i].ProductID;
                    string size = items[i].Size;
                    var product = entity.Product_Size_Quantity.Where(p => p.ProductID == pid && p.Size == size).FirstOrDefault();
                    if (product.Quantity >= items[i].Amount) product.Quantity -= items[i].Amount;
                    else return false;
                }
                entity.SaveChanges();
            }
            return true;
        }

        /*[HttpPost]
        public IHttpActionResult SaveCartForGuestPayment(CartModel[] items, string guestid)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {
                    // tạo cart mới
                    string cartid = "CR-" + (entity.Carts.Count() + 1);
                    entity.Carts.Add(new Cart
                    {
                        CartID = cartid,
                        UserID = guestid,
                        IsUsing = false,
                    });
                    // lưu sản phẩm vào cart vừa tạo
                    for (int i = 0; i < items.Length; i++)
                    {
                        entity.Cart_Product.Add(new Cart_Product
                        {
                            CartID = cartid,
                            ProductID = items[i].ProductID,
                            Size = items[i].Size,
                            Amount = items[i].Amount,
                            SalePrice = items[i].SalePrice
                        });
                    }
                    entity.SaveChanges();
                    bool success = UpdateQuantity(items);
                    if (success == false) return BadRequest("Update fail.");
                    return Ok(cartid);
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }*/
    }
}
