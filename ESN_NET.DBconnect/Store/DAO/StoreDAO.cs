using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Property.MODEL;
using ESN_NET.DBconnect.Store.MODEL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace ESN_NET.DBconnect.Store.DAO
{
    public class StoreDAO : IDisposable
    {
        #region Constants

        private const string SELECT_QUERY = @"
                                                SELECT [s].*, [p].*
                                                FROM [dbo].[ZTBLSTORE] s
                                                INNER JOIN [dbo].[ZTBLPROVINCE] p ON p.PROPERTYID = s.PROVINCEID";

        #endregion

        #region Private variables

        private SQLconnect conn;

        #endregion

        #region Constructor

        /// <summary>
        /// Class constructor.
        /// </summary>
        public StoreDAO()
        {
            conn = new SQLconnect();
        }

        #endregion

        #region Helper predicate

        /// <summary>
        /// Predicate function to operate on result record.
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="objdb"></param>
        /// <returns></returns>
        public int ExecuteFunc(SqlDataReader reader, List<StoreModel> objdb)
        {
            var model = new StoreModel
            {
                #region Store

                STOREID = reader.GetInt32(0),
                STORECODE = reader.GetString(2),

                STORENAME_TH = reader.GetString(4),
                AGREEMENTDOCNO = reader.GetInt32(5),
                LICENSEDOCNO = reader.GetInt32(6),
                SPACERENTALDOCNO = reader.GetInt32(7),
                CREATEDATE = reader.GetDateTime(8),
                CREATEBY = reader.GetString(9),
                LASTUPDATE = reader.GetDateTime(10),
                LASTUPDATEBY = reader.GetString(11),
                ACTIVE = reader.GetInt32(12),

                #endregion Store

                #region Province

                PROVINCE = new PropertyModel
                {
                    PROPERTYID = reader.GetInt32(13),
                    PROPERTYNAME = reader.GetString(15),
                    PROPERTYDESC_EN = reader.GetString(16),
                    PROPERTYDESC_TH = reader.GetString(17)
                }

                #endregion Province
            };

            #region Handle nullable values

            if (!reader.IsDBNull(1))
            {
                model.COSTCENTER = reader.GetString(1);
            }

            if (!reader.IsDBNull(3))
            {
                model.STORENAME_EN = reader.GetString(3);
            }

            #endregion Handle nullable values

            objdb.Add(model);

            // predicate must return some value
            return 0;
        }

        #endregion Helper predicate

        #region Methods

        /// <summary>
        /// Get store list from database table.
        /// </summary>
        /// <returns></returns>
        public List<StoreModel> GetStoreList()
        {
            const string sql = SELECT_QUERY;

            var executedResult = conn.GetSQLQueryStringByDelegate<StoreModel>(sql, ExecuteFunc);
            return executedResult;
        }

        /// <summary>
        /// Get stores by filter from database table.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<StoreModel> GetStoreByProperty(StoreModel model)
        {
            var sql = new StringBuilder();

            sql.AppendLine(SELECT_QUERY);

            var filter = new List<string>();

            // Cost Center
            if (!String.IsNullOrWhiteSpace(model.COSTCENTER))
            {
                filter.Add(String.Format("[s].[COSTCENTER] like '%{0}%'", model.COSTCENTER));
            }

            // Store Code
            if (!String.IsNullOrWhiteSpace(model.STORECODE))
            {
                filter.Add(String.Format("[s].[STORECODE] like '%{0}%'", model.STORECODE));
            }

            // Store Name TH
            if (!String.IsNullOrWhiteSpace(model.STORENAME_TH))
            {
                filter.Add(String.Format("[s].[STORENAME_TH] like '%{0}%'", model.STORENAME_TH));
            }

            // Store Name EN
            if (!String.IsNullOrWhiteSpace(model.STORENAME_EN))
            {
                filter.Add(String.Format("[s].[STORENAME_EN] like '%{0}%'", model.STORENAME_EN));
            }

            // Province
            if (model.PROVINCE != null && model.PROVINCE.PROPERTYID > 0)
            {
                filter.Add(String.Format("[s].[PROVINCEID] = {0}", model.PROVINCE.PROPERTYID));
            }

            // Active
            if (model.ACTIVE >= 0)
            {
                filter.Add(String.Format("[s].[ACTIVE] = {0}", model.ACTIVE));
            }

            if (filter.Count > 0)
            {
                sql.Append(" WHERE ");
                sql.Append(String.Join(" AND ", filter));
            }

            var executedResult = conn.GetSQLQueryStringByDelegate<StoreModel>(sql.ToString(), ExecuteFunc);
            return executedResult;
        }

        /// <summary>
        /// Insert a new store into database table.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel InsertStore(StoreModel model)
        {
            var arLstParameter = new ArrayList();

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@costCenter", model.COSTCENTER, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@storeCode", model.STORECODE, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@storeNameTH", model.STORENAME_TH, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@storeNameEN", model.STORENAME_EN, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@provinceId", model.PROVINCE.PROPERTYID.ToString(), "INT");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@active", model.ACTIVE.ToString(), "INT");

            var executedResult = conn.GetResultPROC<MessageModel>("ESN_SP_STORE_INSERT", arLstParameter).First<MessageModel>();
            return executedResult;
        }

        /// <summary>
        /// Update an existing record in database table.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public MessageModel UpdateStore(StoreModel model)
        {
            var arLstParameter = new ArrayList();

            SQLconnect.PROCArgumentsCollection(arLstParameter, "@storeId", model.STOREID.ToString(), "INT");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@costCenter", model.COSTCENTER, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@storeNameTH", model.STORENAME_TH, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@storeNameEN", model.STORENAME_EN, "NVARCHAR");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@provinceId", model.PROVINCE.PROPERTYID.ToString(), "INT");
            SQLconnect.PROCArgumentsCollection(arLstParameter, "@active", model.ACTIVE.ToString(), "INT");

            var executedResult = conn.GetResultPROC<MessageModel>("ESN_SP_STORE_UPDATE", arLstParameter).First<MessageModel>();
            return executedResult;
        }

        #endregion Methods

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
