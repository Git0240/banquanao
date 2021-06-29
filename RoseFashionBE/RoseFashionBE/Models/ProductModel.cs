using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RoseFashionBE.Models
{
    public class ProductModel
    {
        public string ProductID;
        public string Name;
        public string Color;
        public string[] Size;
        public string CategoryID;
        public string Description;
        public int[] Quantity;
        public string Image;
        public long Price;
        public int DiscountPercent;
        public bool SoldOut;
    }
}