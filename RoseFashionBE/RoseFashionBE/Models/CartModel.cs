using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RoseFashionBE.Models
{
    public class CartModel
    {
        public string CartID;
        public string UserID;
        public string ProductID;
        public string Name;
        public string Image;
        public string Size;
        public int Amount;
        public int Quantity;
        public bool IsUsing;
        public long SalePrice;
        public long OriginalPrice;
    }
}