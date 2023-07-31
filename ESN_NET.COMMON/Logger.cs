using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESN_NET.COMMON
{
    public class Logger
    {
        private string className;
        private string path = GetConfig.getAppSetting(Constants.LOG_FILE_PATH);
        private string fileName = DateTime.Now.ToString("yyyyMMdd") + ".log";
        private string fullPathFile;

        /// <summary>
        /// Class constructor
        /// (clazz is mean class)
        /// </summary>
        /// <param name="clazz"></param>
        public Logger(String clazz)
        {
            className = clazz;
            fullPathFile = path + fileName;
        }

        private void DumpLog(StreamReader r)
        {
            string line;
            while ((line = r.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }

        public void debug(string logMessage)
        {
            using (StreamWriter w = (File.Exists(fullPathFile)) ? File.AppendText(fullPathFile) : File.CreateText(fullPathFile))
            {
                w.Write("\r\n{0} {1} {2} {3}", DateTime.Now.ToShortDateString(), DateTime.Now.ToShortTimeString(), "DEBUG", "(" + className + ")");
                w.Write(" - {0}", logMessage);

                w.Flush();
            }

            using (StreamReader r = File.OpenText(fullPathFile))
            {
                DumpLog(r);
            }

        }

        public void error(string logMessage)
        {
            using (StreamWriter w = (File.Exists(fullPathFile)) ? File.AppendText(fullPathFile) : File.CreateText(fullPathFile))
            {
                w.Write("\r\n{0} {1} {2} {3}", DateTime.Now.ToShortDateString(), DateTime.Now.ToShortTimeString(), "ERROR", "(" + className + ")");
                w.Write(" - {0}", logMessage);

                w.Flush();
            }

            using (StreamReader r = File.OpenText(fullPathFile))
            {
                DumpLog(r);
            }
        }

        public void info(string logMessage)
        {
            using (StreamWriter w = (File.Exists(fullPathFile)) ? File.AppendText(fullPathFile) : File.CreateText(fullPathFile))
            {
                w.Write("\r\n{0} {1} {2} {3}", DateTime.Now.ToShortDateString(), DateTime.Now.ToShortTimeString(), "INFO", "(" + className + ")");
                w.Write(" - {0}", logMessage);

                w.Flush();
            }

            using (StreamReader r = File.OpenText(fullPathFile))
            {
                DumpLog(r);
            }
        }

        public void warn(string logMessage)
        {
            using (StreamWriter w = (File.Exists(fullPathFile)) ? File.AppendText(fullPathFile) : File.CreateText(fullPathFile))
            {
                w.Write("\r\n{0} {1} {2} {3}", DateTime.Now.ToShortDateString(), DateTime.Now.ToShortTimeString(), "WARN", "(" + className + ")");
                w.Write(" - {0}", logMessage);

                w.Flush();
            }

            using (StreamReader r = File.OpenText(fullPathFile))
            {
                DumpLog(r);
            }
        }

    }
}
