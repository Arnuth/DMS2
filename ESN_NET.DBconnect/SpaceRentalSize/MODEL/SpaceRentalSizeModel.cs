using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.SpaceRentalSize.MODEL
{
    public class SpaceRentalSizeModel
    {
        public int SPACERENTALSIZEID { get; set; }
        public int SPACERENTALTYPEID { get; set; }
        public string PROPERTYDESC_EN { get; set; }
        public string PROPERTYDESC_TH { get; set; }
        public Decimal SERVICEAMOUNT { get; set; }
        public Decimal OTHERAMOUNT { get; set; }
    }
}
