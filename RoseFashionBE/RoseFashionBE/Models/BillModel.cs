using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RoseFashionBE.Models
{
    public class BillModel
    {
        public string BillID;
        public string CartID;
        public DateTime OrderDate;
        public string ReceiverName;
        public string ReceiverPhone;
        public string DeliveryAddress;
        public string DiscountCode;
        public long TotalPrice;
    }
}