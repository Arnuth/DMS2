using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Data;
using System.Collections;
using System.Reflection;
using ESN_NET.COMMON;
using System.Dynamic;

namespace ESN_NET.DBconnect.Common
{
    public class SQLconnect : IDisposable
    {
        private SqlConnection conn;
        private string connStr;

        public SQLconnect()
        {
            connStr = GetConfig.getConnectionString(Constants.DB_CONNECTION);
        }

        internal class PROCArgBuild
        {
            internal string parameterName = string.Empty;
            internal string parameterValue = string.Empty;
            internal string pramValueType = string.Empty;
            internal PROCArgBuild(string pramName, string pramValue, string pramValueType)
            {
                this.parameterName = pramName;
                this.parameterValue = pramValue;
                this.pramValueType = pramValueType;

            }
        }

        public static ArrayList PROCArgumentsCollection(ArrayList arrLst, string paramName, string paramValue, string paramType)
        {
            PROCArgBuild ArgBuiltObj = new PROCArgBuild(paramName, paramValue, paramType);
            arrLst.Add(ArgBuiltObj);
            return arrLst;
        }

        public static List<DataTableParameter> PROCDataTablesCollection(List<DataTableParameter> dtParams, string paramName, DataTable data)
        {
            DataTableParameter dtParam = new DataTableParameter();
            dtParam.PARAMETER_NAME = paramName;
            dtParam.PARAMETER_DATATABLE = data;

            dtParams.Add(dtParam);
            return dtParams;
        }

        //For Dynamic Fixed Column Not Close Connection In This Class. But Close In DAO Class.
        public SqlDataReader RunStoredProcedure(string procName, ArrayList param, SqlConnection connection)
        {
            SqlCommand command = new SqlCommand();

            try
            {
                connection.Open();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = procName;
                command.CommandTimeout = 100000;

                string paramName, paramValue, paramDataType;

                PROCArgBuild pROCArgBuild;
                for (int i = 0; i < param.Count; i++)
                {
                    pROCArgBuild = (PROCArgBuild)param[i];

                    paramName = pROCArgBuild.parameterName;
                    paramValue = pROCArgBuild.parameterValue;
                    paramDataType = pROCArgBuild.pramValueType;

                    SqlParameter pram = null;

                    #region SQL DB TYPE AND VALUE ASSIGNMENT
                    switch (paramDataType.ToUpper())
                    {
                        case "BIGINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.BigInt);
                            pram.Value = paramValue;
                            break;

                        case "BINARY":
                            pram = command.Parameters.Add(paramName, SqlDbType.Binary);
                            pram.Value = paramValue;
                            break;

                        case "BIT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Bit);
                            pram.Value = paramValue;
                            break;

                        case "CHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.Char);
                            pram.Value = paramValue;
                            break;

                        case "DATETIME":
                            pram = command.Parameters.Add(paramName, SqlDbType.DateTime);
                            pram.Value = paramValue;
                            break;

                        case "DECIMAL":
                            pram = command.Parameters.Add(paramName, SqlDbType.Decimal);
                            pram.Value = paramValue;
                            break;

                        case "FLOAT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Float);
                            pram.Value = paramValue;
                            break;

                        case "IMAGE":
                            pram = command.Parameters.Add(paramName, SqlDbType.Image);
                            pram.Value = paramValue;
                            break;

                        case "INT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Int);
                            pram.Value = paramValue;
                            break;

                        case "MONEY":
                            pram = command.Parameters.Add(paramName, SqlDbType.Money);
                            pram.Value = paramValue;
                            break;

                        case "NCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.NChar);
                            pram.Value = paramValue;
                            break;

                        case "NTEXT":
                            pram = command.Parameters.Add(paramName, SqlDbType.NText);
                            pram.Value = paramValue;
                            break;

                        case "NVARCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.NVarChar);
                            pram.Value = (object)paramValue ?? DBNull.Value;
                            break;

                        case "REAL":
                            pram = command.Parameters.Add(paramName, SqlDbType.Real);
                            pram.Value = paramValue;
                            break;

                        case "SMALLDATETIME":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallDateTime);
                            pram.Value = paramValue;
                            break;

                        case "SMALLINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallInt);
                            pram.Value = paramValue;
                            break;

                        case "SMALLMONEY":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallMoney);
                            pram.Value = paramValue;
                            break;

                        case "TEXT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Text);
                            pram.Value = paramValue;
                            break;

                        case "TIMESTAMP":
                            pram = command.Parameters.Add(paramName, SqlDbType.Timestamp);
                            pram.Value = paramValue;
                            break;

                        case "TINYINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.TinyInt);
                            pram.Value = paramValue;
                            break;

                        case "UDT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Udt);
                            pram.Value = paramValue;
                            break;

                        case "UMIQUEIDENTIFIER":
                            pram = command.Parameters.Add(paramName, SqlDbType.UniqueIdentifier);
                            pram.Value = paramValue;
                            break;

                        case "VARBINARY":
                            pram = command.Parameters.Add(paramName, SqlDbType.VarBinary);
                            pram.Value = paramValue;
                            break;

                        case "VARCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.VarChar);
                            pram.Value = paramValue;
                            break;

                        case "VARIANT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Variant);
                            pram.Value = paramValue;
                            break;

                        case "XML":
                            pram = command.Parameters.Add(paramName, SqlDbType.Xml);
                            pram.Value = paramValue;
                            break;
                    }
                    #endregion
                    pram.Direction = ParameterDirection.Input;
                }

                SqlDataReader reader = command.ExecuteReader();
                return reader;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        // this if want to select something in your db
        public List<T> GetSQLQueryStirng<T>(string query) where T : class
        {
            try
            {
                List<T> objdb = new List<T>();
                conn = new SqlConnection(connStr);
                SqlCommand command = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    objdb.Add(MapToClass<T>(reader));
                }

                return objdb;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        /// <summary>
        /// Execute query string by specifying delegate function to operate on data. 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="executeFunc"></param>
        /// <returns></returns>
        public List<T> GetSQLQueryStringByDelegate<T>(string query, Func<SqlDataReader, List<T>, int> executeFunc) where T : class
        {
            try
            {
                conn = new SqlConnection(connStr);

                SqlCommand command = new SqlCommand(query, conn);
                conn.Open();

                SqlDataReader reader = command.ExecuteReader();

                List<T> objdb = new List<T>();
                while (reader.Read())
                {
                    executeFunc(reader, objdb);
                }

                return objdb;
            }
            finally
            {
                conn.Close();
            }
        }

        public List<T> GetResultPROC<T>(string procName, ArrayList param) where T : class
        {
            try
            {
                List<T> objdb = new List<T>();
                conn = new SqlConnection(connStr);
                conn.Open();

                SqlCommand command = new SqlCommand
                {
                    CommandType = CommandType.StoredProcedure,
                    Connection = conn,
                    CommandText = procName,
                    CommandTimeout = 100000
                };

                string paramName, paramValue, paramDataType;

                PROCArgBuild pROCArgBuild;
                for (int i = 0; i < param.Count; i++)
                {
                    pROCArgBuild = (PROCArgBuild)param[i];

                    paramName = pROCArgBuild.parameterName;
                    paramValue = pROCArgBuild.parameterValue;
                    paramDataType = pROCArgBuild.pramValueType;

                    SqlParameter pram = null;

                    #region SQL DB TYPE AND VALUE ASSIGNMENT
                    switch (paramDataType.ToUpper())
                    {
                        case "BIGINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.BigInt);
                            pram.Value = paramValue;
                            break;

                        case "BINARY":
                            pram = command.Parameters.Add(paramName, SqlDbType.Binary);
                            pram.Value = paramValue;
                            break;

                        case "BIT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Bit);
                            pram.Value = paramValue;
                            break;

                        case "CHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.Char);
                            pram.Value = paramValue;
                            break;

                        case "DATETIME":
                            pram = command.Parameters.Add(paramName, SqlDbType.DateTime);
                            pram.Value = paramValue;
                            break;

                        case "DECIMAL":
                            pram = command.Parameters.Add(paramName, SqlDbType.Decimal);
                            pram.Value = paramValue;
                            break;

                        case "FLOAT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Float);
                            pram.Value = paramValue;
                            break;

                        case "IMAGE":
                            pram = command.Parameters.Add(paramName, SqlDbType.Image);
                            pram.Value = paramValue;
                            break;

                        case "INT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Int);
                            pram.Value = paramValue;
                            break;

                        case "MONEY":
                            pram = command.Parameters.Add(paramName, SqlDbType.Money);
                            pram.Value = paramValue;
                            break;

                        case "NCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.NChar);
                            pram.Value = paramValue;
                            break;

                        case "NTEXT":
                            pram = command.Parameters.Add(paramName, SqlDbType.NText);
                            pram.Value = paramValue;
                            break;

                        case "NVARCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.NVarChar);
                            pram.Value = (object)paramValue ?? DBNull.Value;
                            break;

                        case "REAL":
                            pram = command.Parameters.Add(paramName, SqlDbType.Real);
                            pram.Value = paramValue;
                            break;

                        case "SMALLDATETIME":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallDateTime);
                            pram.Value = paramValue;
                            break;

                        case "SMALLINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallInt);
                            pram.Value = paramValue;
                            break;

                        case "SMALLMONEY":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallMoney);
                            pram.Value = paramValue;
                            break;

                        case "TEXT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Text);
                            pram.Value = paramValue;
                            break;

                        case "TIMESTAMP":
                            pram = command.Parameters.Add(paramName, SqlDbType.Timestamp);
                            pram.Value = paramValue;
                            break;

                        case "TINYINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.TinyInt);
                            pram.Value = paramValue;
                            break;

                        case "UDT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Udt);
                            pram.Value = paramValue;
                            break;

                        case "UMIQUEIDENTIFIER":
                            pram = command.Parameters.Add(paramName, SqlDbType.UniqueIdentifier);
                            pram.Value = paramValue;
                            break;

                        case "VARBINARY":
                            pram = command.Parameters.Add(paramName, SqlDbType.VarBinary);
                            pram.Value = paramValue;
                            break;

                        case "VARCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.VarChar);
                            pram.Value = paramValue;
                            break;

                        case "VARIANT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Variant);
                            pram.Value = paramValue;
                            break;

                        case "XML":
                            pram = command.Parameters.Add(paramName, SqlDbType.Xml);
                            pram.Value = paramValue;
                            break;
                    }
                    #endregion
                    pram.Direction = ParameterDirection.Input;
                }

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    objdb.Add(MapToClass<T>(reader));
                }

                return objdb;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        public List<T> GetResultPROCWithDataTable<T>(string procName, List<DataTableParameter> dtParams) where T : class
        {
            try
            {
                List<T> objdb = new List<T>();
                conn = new SqlConnection(connStr);
                conn.Open();
                
                SqlCommand command = new SqlCommand
                {
                    CommandType = CommandType.StoredProcedure,
                    Connection = conn,
                    CommandText = procName,
                    CommandTimeout = 100000
                };

                foreach (DataTableParameter dtParam in dtParams)
                {
                    SqlParameter sqlParam = command.Parameters.AddWithValue(dtParam.PARAMETER_NAME, dtParam.PARAMETER_DATATABLE);
                    sqlParam.SqlDbType = SqlDbType.Structured;
                }

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    objdb.Add(MapToClass<T>(reader));
                }

                return objdb;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        public List<T> GetResultPROCWithDataTable<T>(string procName, List<DataTableParameter> dtParams, ArrayList param) where T : class
        {
            try
            {
                List<T> objdb = new List<T>();
                conn = new SqlConnection(connStr);
                conn.Open();

                SqlCommand command = new SqlCommand
                {
                    CommandType = CommandType.StoredProcedure,
                    Connection = conn,
                    CommandText = procName,
                    CommandTimeout = 100000
                };

                string paramName, paramValue, paramDataType;

                PROCArgBuild pROCArgBuild;
                for (int i = 0; i < param.Count; i++)
                {
                    pROCArgBuild = (PROCArgBuild)param[i];

                    paramName = pROCArgBuild.parameterName;
                    paramValue = pROCArgBuild.parameterValue;
                    paramDataType = pROCArgBuild.pramValueType;

                    SqlParameter pram = null;

                    #region SQL DB TYPE AND VALUE ASSIGNMENT
                    switch (paramDataType.ToUpper())
                    {
                        case "BIGINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.BigInt);
                            pram.Value = paramValue;
                            break;

                        case "BINARY":
                            pram = command.Parameters.Add(paramName, SqlDbType.Binary);
                            pram.Value = paramValue;
                            break;

                        case "BIT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Bit);
                            pram.Value = paramValue;
                            break;

                        case "CHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.Char);
                            pram.Value = paramValue;
                            break;

                        case "DATETIME":
                            pram = command.Parameters.Add(paramName, SqlDbType.DateTime);
                            pram.Value = paramValue;
                            break;

                        case "DECIMAL":
                            pram = command.Parameters.Add(paramName, SqlDbType.Decimal);
                            pram.Value = paramValue;
                            break;

                        case "FLOAT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Float);
                            pram.Value = paramValue;
                            break;

                        case "IMAGE":
                            pram = command.Parameters.Add(paramName, SqlDbType.Image);
                            pram.Value = paramValue;
                            break;

                        case "INT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Int);
                            pram.Value = paramValue;
                            break;

                        case "MONEY":
                            pram = command.Parameters.Add(paramName, SqlDbType.Money);
                            pram.Value = paramValue;
                            break;

                        case "NCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.NChar);
                            pram.Value = paramValue;
                            break;

                        case "NTEXT":
                            pram = command.Parameters.Add(paramName, SqlDbType.NText);
                            pram.Value = paramValue;
                            break;

                        case "NVARCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.NVarChar);
                            pram.Value = (object)paramValue ?? DBNull.Value;
                            break;

                        case "REAL":
                            pram = command.Parameters.Add(paramName, SqlDbType.Real);
                            pram.Value = paramValue;
                            break;

                        case "SMALLDATETIME":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallDateTime);
                            pram.Value = paramValue;
                            break;

                        case "SMALLINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallInt);
                            pram.Value = paramValue;
                            break;

                        case "SMALLMONEY":
                            pram = command.Parameters.Add(paramName, SqlDbType.SmallMoney);
                            pram.Value = paramValue;
                            break;

                        case "TEXT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Text);
                            pram.Value = paramValue;
                            break;

                        case "TIMESTAMP":
                            pram = command.Parameters.Add(paramName, SqlDbType.Timestamp);
                            pram.Value = paramValue;
                            break;

                        case "TINYINT":
                            pram = command.Parameters.Add(paramName, SqlDbType.TinyInt);
                            pram.Value = paramValue;
                            break;

                        case "UDT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Udt);
                            pram.Value = paramValue;
                            break;

                        case "UMIQUEIDENTIFIER":
                            pram = command.Parameters.Add(paramName, SqlDbType.UniqueIdentifier);
                            pram.Value = paramValue;
                            break;

                        case "VARBINARY":
                            pram = command.Parameters.Add(paramName, SqlDbType.VarBinary);
                            pram.Value = paramValue;
                            break;

                        case "VARCHAR":
                            pram = command.Parameters.Add(paramName, SqlDbType.VarChar);
                            pram.Value = paramValue;
                            break;

                        case "VARIANT":
                            pram = command.Parameters.Add(paramName, SqlDbType.Variant);
                            pram.Value = paramValue;
                            break;

                        case "XML":
                            pram = command.Parameters.Add(paramName, SqlDbType.Xml);
                            pram.Value = paramValue;
                            break;
                    }
                    #endregion
                    pram.Direction = ParameterDirection.Input;
                }


                foreach (DataTableParameter dtParam in dtParams)
                {
                    SqlParameter sqlParam = command.Parameters.AddWithValue(dtParam.PARAMETER_NAME, dtParam.PARAMETER_DATATABLE);
                    sqlParam.SqlDbType = SqlDbType.Structured;
                }

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    objdb.Add(MapToClass<T>(reader));
                }

                return objdb;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
            }
        }

        //For Dynamic Data.
        public IEnumerable<dynamic> GetResultPROCDYNAMICRESULT(string procName, ArrayList param)
        {
            conn = new SqlConnection(connStr);
            conn.Open();

            SqlCommand command = new SqlCommand
            {
                CommandType = CommandType.StoredProcedure,
                Connection = conn,
                CommandText = procName,
                CommandTimeout = 100000
            };

            string paramName, paramValue, paramDataType;

            PROCArgBuild pROCArgBuild;
            for (int i = 0; i < param.Count; i++)
            {
                pROCArgBuild = (PROCArgBuild)param[i];

                paramName = pROCArgBuild.parameterName;
                paramValue = pROCArgBuild.parameterValue;
                paramDataType = pROCArgBuild.pramValueType;

                SqlParameter pram = null;

                #region SQL DB TYPE AND VALUE ASSIGNMENT
                switch (paramDataType.ToUpper())
                {
                    case "BIGINT":
                        pram = command.Parameters.Add(paramName, SqlDbType.BigInt);
                        pram.Value = paramValue;
                        break;

                    case "BINARY":
                        pram = command.Parameters.Add(paramName, SqlDbType.Binary);
                        pram.Value = paramValue;
                        break;

                    case "BIT":
                        pram = command.Parameters.Add(paramName, SqlDbType.Bit);
                        pram.Value = paramValue;
                        break;

                    case "CHAR":
                        pram = command.Parameters.Add(paramName, SqlDbType.Char);
                        pram.Value = paramValue;
                        break;

                    case "DATETIME":
                        pram = command.Parameters.Add(paramName, SqlDbType.DateTime);
                        pram.Value = paramValue;
                        break;

                    case "DECIMAL":
                        pram = command.Parameters.Add(paramName, SqlDbType.Decimal);
                        pram.Value = paramValue;
                        break;

                    case "FLOAT":
                        pram = command.Parameters.Add(paramName, SqlDbType.Float);
                        pram.Value = paramValue;
                        break;

                    case "IMAGE":
                        pram = command.Parameters.Add(paramName, SqlDbType.Image);
                        pram.Value = paramValue;
                        break;

                    case "INT":
                        pram = command.Parameters.Add(paramName, SqlDbType.Int);
                        pram.Value = paramValue;
                        break;

                    case "MONEY":
                        pram = command.Parameters.Add(paramName, SqlDbType.Money);
                        pram.Value = paramValue;
                        break;

                    case "NCHAR":
                        pram = command.Parameters.Add(paramName, SqlDbType.NChar);
                        pram.Value = paramValue;
                        break;

                    case "NTEXT":
                        pram = command.Parameters.Add(paramName, SqlDbType.NText);
                        pram.Value = paramValue;
                        break;

                    case "NVARCHAR":
                        pram = command.Parameters.Add(paramName, SqlDbType.NVarChar);
                        pram.Value = (object)paramValue ?? DBNull.Value;
                        break;

                    case "REAL":
                        pram = command.Parameters.Add(paramName, SqlDbType.Real);
                        pram.Value = paramValue;
                        break;

                    case "SMALLDATETIME":
                        pram = command.Parameters.Add(paramName, SqlDbType.SmallDateTime);
                        pram.Value = paramValue;
                        break;

                    case "SMALLINT":
                        pram = command.Parameters.Add(paramName, SqlDbType.SmallInt);
                        pram.Value = paramValue;
                        break;

                    case "SMALLMONEY":
                        pram = command.Parameters.Add(paramName, SqlDbType.SmallMoney);
                        pram.Value = paramValue;
                        break;

                    case "TEXT":
                        pram = command.Parameters.Add(paramName, SqlDbType.Text);
                        pram.Value = paramValue;
                        break;

                    case "TIMESTAMP":
                        pram = command.Parameters.Add(paramName, SqlDbType.Timestamp);
                        pram.Value = paramValue;
                        break;

                    case "TINYINT":
                        pram = command.Parameters.Add(paramName, SqlDbType.TinyInt);
                        pram.Value = paramValue;
                        break;

                    case "UDT":
                        pram = command.Parameters.Add(paramName, SqlDbType.Udt);
                        pram.Value = paramValue;
                        break;

                    case "UMIQUEIDENTIFIER":
                        pram = command.Parameters.Add(paramName, SqlDbType.UniqueIdentifier);
                        pram.Value = paramValue;
                        break;

                    case "VARBINARY":
                        pram = command.Parameters.Add(paramName, SqlDbType.VarBinary);
                        pram.Value = paramValue;
                        break;

                    case "VARCHAR":
                        pram = command.Parameters.Add(paramName, SqlDbType.VarChar);
                        pram.Value = paramValue;
                        break;

                    case "VARIANT":
                        pram = command.Parameters.Add(paramName, SqlDbType.Variant);
                        pram.Value = paramValue;
                        break;

                    case "XML":
                        pram = command.Parameters.Add(paramName, SqlDbType.Xml);
                        pram.Value = paramValue;
                        break;
                }
                #endregion
                pram.Direction = ParameterDirection.Input;
            }

            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    yield return GetDynamicData(reader);
                }
            }

            conn.Close();

        }

        private dynamic GetDynamicData(SqlDataReader reader)
        {
            var expandoObject = new ExpandoObject() as IDictionary<string, object>;
            for (int i = 0; i < reader.FieldCount; i++)
            {
                expandoObject.Add(reader.GetName(i), reader[i]);
            }
            return expandoObject;
        }

        private T MapToClass<T>(SqlDataReader reader) where T : class
        {
            T returnedObject = Activator.CreateInstance<T>();
            for (int c = 0; c < reader.FieldCount; c++)
            {
                var name = reader.GetName(c);
                var value = reader.GetValue(c);
                var objProp = returnedObject.GetType().GetProperty(name, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                if (value != DBNull.Value)
                {
                    if (objProp != null)
                    {
                        Type type = Nullable.GetUnderlyingType(objProp.PropertyType) ?? objProp.PropertyType;
                        objProp.SetValue(returnedObject, Convert.ChangeType(reader.GetValue(c), type), null);
                    }
                }
            }

            return returnedObject;
        }

        public int GetRowEffect(string query)
        {
            try
            {
                conn = new SqlConnection(connStr);
                SqlCommand command = new SqlCommand(query, conn);
                command.Connection.Open();
                int result = command.ExecuteNonQuery();
                command.Connection.Close();
                conn.Close();

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    conn.Dispose();
                }

                disposedValue = true;
            }
        }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            Dispose(true);
        }
        #endregion

    }
}
