using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RoseFashionBE.Models
{
    public class UserModel
    {
        public string UserID;
        public string Password;
        public string FullName;
        public string Gender;
        public Nullable<DateTime> DOB;
        public string Email;
        public string Address;
        public string Phone;
        public string Role;
    }
}