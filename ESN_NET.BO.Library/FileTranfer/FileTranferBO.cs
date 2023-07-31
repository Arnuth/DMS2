using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.FileAttachment.DAO;
using ESN_NET.DBconnect.FileAttachment.MODEL;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Text;

namespace ESN_NET.BO.Library.FileTranfer
{
    public class FileTranferBO
    {
        /// <Since 14 March 2018> </Since>
        public MessageModel insertPathFile(List<FileAttachmentModel> modelList)
        {
            var dataTable = new DataTable("ESN_TYPE_FILEATTACHMENT");
            dataTable.Columns.Add("REQID", typeof(string));
            dataTable.Columns.Add("PATH", typeof(string));
            dataTable.Columns.Add("SIZE", typeof(int));
            dataTable.Columns.Add("DOCFILETYPE", typeof(string));

            if (modelList != null)
            {
                foreach (var item in modelList)
                {
                    dataTable.Rows.Add(item.REQID, item.PATH, item.SIZE, item.DOCFILETYPE);
                }
            }

            var daoClass = new FileAttachmentDAO();
            var result = daoClass.insertPathFile(dataTable);

            return result;
        }

        /// <summary>
        /// Create folder.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="store"></param>
        /// <param name="doctype"></param>
        /// <param name="reqno"></param>
        /// <returns></returns>
        public string createFolder(string path, params string[] subPaths)
        {
            string target = BuildDirPathFromSubPaths(path, subPaths);
            Directory.CreateDirectory(target);

            return target;
        }

        /// <summary>
        /// Check file exists.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="store"></param>
        /// <param name="doctype"></param>
        /// <param name="reqno"></param>
        /// <param name="filename"></param>
        /// <returns></returns>
        public bool CheckFileExists(string path, params string[] subPaths)
        {
            string target = BuildFilePathFromSubPaths(path, subPaths);
            return File.Exists(target);
        }

        private string BuildDirPathFromSubPaths(string path, params string[] subPaths)
        {
            var builder = new StringBuilder();
            builder.Append(path);
            foreach (string sp in subPaths)
            {
                builder.Append(sp);
                builder.Append(@"\");
            }

            // return pattern: {path}{subPath_0}\{subPath_1}\{subPath_2}\...
            return builder.ToString();
        }

        private string BuildFilePathFromSubPaths(string path, params string[] subPaths)
        {
            string target = BuildDirPathFromSubPaths(path, subPaths);

            // remove the exceeding '\' character at the end.
            return target.Substring(0, target.Length - 1);
        }
    }
}
