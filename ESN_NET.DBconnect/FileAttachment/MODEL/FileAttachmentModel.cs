using ESN_NET.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.DBconnect.FileAttachment.MODEL
{
    public class FileAttachmentModel
    {
        public int FILEATTACHMENT { get; set; }
        public string REQID { get; set; }
        public string STORECODE { get; set; }
        public string STORENAME { get; set; }
        public string DOCTYPENAME { get; set; }
        public string DOCRUNNO { get; set; }
        public DateTime? CREATEDATE { get; set; }
        public string BC_CREATEDATE
        {
            get
            {
                return CREATEDATE == null ? "-" : Constants.getDateBC(CREATEDATE);
            }
            set { }
        }
        public string DOCREFID { get; set; }
        public string PATH { get; set; }
        public double SIZE { get; set; }
        public string FILESIZE {
            get { return ToFileSize(SIZE); }
            set { }
        }
        public string DOCFILETYPE { get; set; }
        public string DOCTYPE { get; set; }
        public static string ToFileSize(double value)
        {
            string[] suffixes = { "bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
            for (int i = 0; i < suffixes.Length; i++)
            {
                if (value <= (Math.Pow(1024, i + 1)))
                {
                    return ThreeNonZeroDigits(value / Math.Pow(1024, i)) + " " + suffixes[i];
                }
            }

            return ThreeNonZeroDigits(value / Math.Pow(1024, suffixes.Length - 1)) +
                " " + suffixes[suffixes.Length - 1];
        }
        private static string ThreeNonZeroDigits(double value)
        {
            if (value >= 100)
            {
                // No digits after the decimal.
                return value.ToString("0,0");
            }
            else if (value >= 10)
            {
                // One digit after the decimal.
                return value.ToString("0.0");
            }
            else
            {
                // Two digits after the decimal.
                return value.ToString("0.00");
            }
        }
    }
}
