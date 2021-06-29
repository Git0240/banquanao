using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RoseFashionBE.Models;
using System.Web.Http.Cors;

namespace RoseFashionBE.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BillController : ApiController
    {
        [HttpPost]
        public IHttpActionResult AddBillForGuest(CartModel[] items, BillModel billinfo, string guestid)
        {
            try
            {
                using (var entity = new RoseFashionDBEntities())
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
                    // tạo hóa đơn cho cart vừa tạo
                    entity.Bills.Add(new Bill
                    {
                        BillID = "BL-" + (entity.Bills.Count() + 1),
                        CartID = billinfo.CartID,
                        Date = DateTime.Now.Date,
                        ReceiverName = billinfo.ReceiverName,
                        ReceiverPhone = billinfo.ReceiverPhone,
                        DeliveryAddress = billinfo.DeliveryAddress,
                        DiscountCode = billinfo.DiscountCode,
                        TotalPrice = billinfo.TotalPrice
                    });
                    entity.SaveChanges();
                    return Ok("OK");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult AddBill(BillModel billinfo)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {
                    entity.Bills.Add(new Bill
                    {
                        BillID = "BL-" + (entity.Bills.Count() + 1),
                        CartID = billinfo.CartID,
                        Date = DateTime.Now.Date,
                        ReceiverName = billinfo.ReceiverName,
                        ReceiverPhone = billinfo.ReceiverPhone,
                        DeliveryAddress = billinfo.DeliveryAddress,
                        TotalPrice = billinfo.TotalPrice
                    });
                    var usercart = entity.Carts.Where(c => c.CartID == billinfo.CartID).FirstOrDefault();
                    usercart.IsUsing = false;
                    entity.SaveChanges();
                    return Ok("OK");
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllBillInfo()
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {

                    var result = entity.Bills.Select(b => new BillModel
                    {
                        BillID = b.BillID,
                        CartID = b.CartID,
                        OrderDate = b.Date
                    }).ToList();
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [HttpGet]
        public IHttpActionResult GetUserBills(string userid)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {
                    var cartidlist = entity.Carts.Where(c => c.UserID == userid && c.IsUsing == false)
                        .Select(c => c.CartID).ToList();
                    List<BillModel> result = new List<BillModel>();
                    for (int i = 0; i < cartidlist.Count(); i++)
                    {
                        string cartid = cartidlist[i];
                        var bill = entity.Bills.Where(b => b.CartID == cartid)
                            .Select(b => new BillModel
                            {
                                BillID = b.BillID,
                                OrderDate = b.Date,
                                TotalPrice = b.TotalPrice
                            }).FirstOrDefault();
                        result.Add(bill);
                   }
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public IHttpActionResult GetBillOneInfo(string billid)
        {
            try
            {
                using(var entity = new RoseFashionDBEntities())
                {
                    var result = entity.Bills.Where(b => b.BillID == billid)
                        .Select(b => new BillModel
                        {
                            BillID = b.BillID,
                            CartID = b.CartID,
                            ReceiverName = b.ReceiverName,
                            ReceiverPhone = b.ReceiverPhone,
                            DeliveryAddress = b.DeliveryAddress,
                            OrderDate = b.Date,
                            DiscountCode = b.DiscountCode,
                            TotalPrice = b.TotalPrice
                        }).FirstOrDefault();
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
