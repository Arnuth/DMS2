using ESN_NET.DBconnect.Common;
using ESN_NET.DBconnect.Request.MODEL;
using ESN_NET.DBconnect.Search.MODEL;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESN_NET.DBconnect.Search.DAO
{
    public class SearchDAO : IDisposable
    {
        #region Constant variables

        private const string DB_DATE_FORMAT = "yyyy-MM-dd";

        private const string SQL_REQUEST = @"
                            SELECT DISTINCT * FROM (
                            SELECT 
                                r.*,
                                (r.STORECODE + ' - ' + s.STORENAME_TH) AS STORE,
                                a2.PROPERTYDESC_TH AS AGREEMENTTYPE,
                                l2.PROPERTYDESC_TH AS LICENSETYPE,
                                st.STATUSNAME_TH AS STATUS,
                                (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST,
                                (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY,
	                            STUFF
		                            (                                         (
				                            select ', ' + tmp.VENDORNAME
				                            from  
				                            (	select
						                            REQID,
						                            VENDORNAME
					                            from [dbo].[STBLLESSORINFO]
				                            ) as tmp
				                            where tmp.REQID = r.REQID
				                            for xml path('')
			                            ), 1, 1, ''
	                            ) as VENDORNAMES

                            FROM dbo.STBLREQUEST r
                                LEFT JOIN dbo.ZTBLSTORE s ON r.STORECODE = s.STORECODE
                                LEFT JOIN dbo.STBLDOCUMENT_LANDLEASEAGREEMENT a ON r.REQID = a.REQID
                                LEFT JOIN dbo.ZTBLAGREEMENTTYPE a2 ON a2.PROPERTYID = a.AGREEMENTTYPEID
                                LEFT JOIN dbo.STBLDOCUMENT_LICENSE l ON r.REQID = l.REQID
								LEFT JOIN dbo.ZTBLLICENSETYPE l2 ON l2.PROPERTYID = l.LICENSETYPEID
                                LEFT JOIN dbo.ESN_STATUS st on r.REQUESTSTATUS = st.STATUSID
                                LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                                LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID";

        private const string SQL_REQUEST_NOTIFICATION = @"
                            SELECT DISTINCT * FROM (
                            SELECT 
                                r.*,
                                (r.STORECODE + ' - ' + s.STORENAME_TH) AS STORE,
                                a2.PROPERTYDESC_TH AS AGREEMENTTYPE,
                                l2.PROPERTYDESC_TH AS LICENSETYPE,
                                l.FEEAMOUNT,
                                st.STATUSNAME_TH AS STATUS,
                                (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST,
                                (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY,
	                            STUFF
		                            (                                         (
				                            select ', ' + tmp.VENDORNAME
				                            from  
				                            (	select
						                            REQID,
						                            VENDORNAME
					                            from [dbo].[STBLLESSORINFO]
				                            ) as tmp
				                            where tmp.REQID = r.REQID
				                            for xml path('')
			                            ), 1, 1, ''
	                            ) as VENDORNAMES,
                                n.NOTIFICATIONID,
                                n.NOTICE_TYPE,
								n.NOTICEDATE,
								n.CONDITIONEXPIREDATE,
                                n.NOTICE_USERCLASS,
                                n.LINETEMPLATETYPE,
                                n.EMAILTEMPLATETYPE

                            FROM dbo.STBLREQUEST r
                                LEFT JOIN dbo.ZTBLSTORE s ON r.STORECODE = s.STORECODE
                                LEFT JOIN dbo.STBLDOCUMENT_LANDLEASEAGREEMENT a ON r.REQID = a.REQID
                                LEFT JOIN dbo.ZTBLAGREEMENTTYPE a2 ON a2.PROPERTYID = a.AGREEMENTTYPEID
                                LEFT JOIN dbo.STBLDOCUMENT_LICENSE l ON r.REQID = l.REQID
								LEFT JOIN dbo.ZTBLLICENSETYPE l2 ON l2.PROPERTYID = l.LICENSETYPEID
                                LEFT JOIN dbo.ESN_STATUS st on r.REQUESTSTATUS = st.STATUSID
                                LEFT JOIN dbo.STBLNOTIFICATION n ON r.REQID = n.REQID
                                LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                                LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID";

        private const string SQL_REQUEST_LANDLEASERATE = @"
                            SELECT DISTINCT * FROM (
                            SELECT 
                                r.*,
                                (r.STORECODE + ' - ' + s.STORENAME_TH) AS STORE,
                                a2.PROPERTYDESC_TH AS AGREEMENTTYPE,
                                l2.PROPERTYDESC_TH AS LICENSETYPE,
                                st.STATUSNAME_TH AS STATUS,
                                (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST,
                                (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY,
	                            STUFF
		                            (                                         (
				                            select ', ' + tmp.VENDORNAME
				                            from  
				                            (	select
						                            REQID,
						                            VENDORNAME
					                            from [dbo].[STBLLESSORINFO]
				                            ) as tmp
				                            where tmp.REQID = r.REQID
				                            for xml path('')
			                            ), 1, 1, ''
	                            ) as VENDORNAMES,
                                n.NOTIFICATIONID,
                                n.NOTICE_TYPE,
								n.NOTICEDATE,
	                            n.PAYMENTDATE,
								n.CONDITIONEXPIREDATE,
                                n.NOTICE_USERCLASS,
                                n.LINETEMPLATETYPE,
                                n.EMAILTEMPLATETYPE,
								lr.STARTDATE,
								lr.ENDDATE

                            FROM dbo.STBLREQUEST r
                                LEFT JOIN dbo.ZTBLSTORE s ON r.STORECODE = s.STORECODE
                                LEFT JOIN dbo.STBLDOCUMENT_LANDLEASEAGREEMENT a ON r.REQID = a.REQID
                                LEFT JOIN dbo.ZTBLAGREEMENTTYPE a2 ON a2.PROPERTYID = a.AGREEMENTTYPEID
                                LEFT JOIN dbo.STBLDOCUMENT_LICENSE l ON r.REQID = l.REQID
								LEFT JOIN dbo.ZTBLLICENSETYPE l2 ON l2.PROPERTYID = l.LICENSETYPEID
                                LEFT JOIN dbo.ESN_STATUS st on r.REQUESTSTATUS = st.STATUSID
                                LEFT JOIN dbo.STBLNOTIFICATION n ON r.REQID = n.REQID
                                LEFT JOIN dbo.STBLLANDLEASERATE lr ON r.REQID = lr.REQID 
                                    AND (lr.STARTDATE <= n.NOTICEDATE AND n.NOTICEDATE <= lr.ENDDATE)
                                LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                                LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID";

        private const string SQL_REQUEST_SPACERENTAL = @"
                            SELECT DISTINCT * FROM (
                            SELECT
								r.*,
								a.SPACERENTAL_DOCNO,
                                (r.STORECODE + ' - ' + s.STORENAME_TH) AS STORE,
                                a2.PROPERTYDESC_TH AS SPACERENTALTYPE,
                                l2.PROPERTYDESC_TH AS LICENSETYPE,
                                st.STATUSNAME_TH AS STATUS,
                                (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST,
                                (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY,
	                            STUFF ((
				                            select ', ' + tmp.VENDORNAME
				                            from  
				                            (	select
						                            REQID,
						                            VENDORNAME
					                            from [dbo].[STBLLESSEEINFO]
				                            ) as tmp
				                            where tmp.REQID = r.REQID
				                            for xml path('')
			                            ), 1, 1, ''
	                            ) as VENDORNAMES

                            FROM dbo.STBLREQUEST r
                                LEFT JOIN dbo.ZTBLSTORE s ON r.STORECODE = s.STORECODE
                                LEFT JOIN dbo.STBLDOCUMENT_SPACERENTAL a ON r.REQID = a.REQID
                                LEFT JOIN dbo.ZTBLSPACERENTALTYPE a2 ON a2.PROPERTYID = a.SPACERENTALTYPEID
                                LEFT JOIN dbo.STBLDOCUMENT_LICENSE l ON r.REQID = l.REQID
								LEFT JOIN dbo.ZTBLLICENSETYPE l2 ON l2.PROPERTYID = l.LICENSETYPEID
                                LEFT JOIN dbo.ESN_STATUS st on r.REQUESTSTATUS = st.STATUSID
                                LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                                LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID";

        private const string SQL_REQUEST_SPACERENTAL_NOTIFICATION = @"
                            SELECT DISTINCT * FROM (
                            SELECT
								r.*,
								a.SPACERENTAL_DOCNO,
                                (r.STORECODE + ' - ' + s.STORENAME_TH) AS STORE,
                                a2.PROPERTYDESC_TH AS SPACERENTALTYPE,
                                l2.PROPERTYDESC_TH AS LICENSETYPE,
                                st.STATUSNAME_TH AS STATUS,
                                (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST,
                                (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY,
                                n.NOTIFICATIONID,
	                            n.NOTICEDATE,
								              n.CONDITIONEXPIREDATE,
	                            n.PAYMENTDATE,
	                            STUFF ((
				                            select ', ' + tmp.VENDORNAME
				                            from  
				                            (	select
						                            REQID,
						                            VENDORNAME
					                            from [dbo].[STBLLESSEEINFO]
				                            ) as tmp
				                            where tmp.REQID = r.REQID
				                            for xml path('')
			                            ), 1, 1, ''
	                            ) as VENDORNAMES

                            FROM dbo.STBLREQUEST r
                                LEFT JOIN dbo.ZTBLSTORE s ON r.STORECODE = s.STORECODE
                                LEFT JOIN dbo.STBLDOCUMENT_SPACERENTAL a ON r.REQID = a.REQID
                                LEFT JOIN dbo.ZTBLSPACERENTALTYPE a2 ON a2.PROPERTYID = a.SPACERENTALTYPEID
                                LEFT JOIN dbo.STBLDOCUMENT_LICENSE l ON r.REQID = l.REQID
								LEFT JOIN dbo.ZTBLLICENSETYPE l2 ON l2.PROPERTYID = l.LICENSETYPEID
                                LEFT JOIN dbo.ESN_STATUS st on r.REQUESTSTATUS = st.STATUSID
                                LEFT JOIN dbo.STBLNOTIFICATION n ON r.REQID = n.REQID
                                LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                                LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID";

        private const string SQL_REQUEST_VEHICLERENTAL_NOTIFICATION = @"
                            SELECT DISTINCT * FROM (
                            SELECT    r.*
		                            , a.VEHICLERENTAL_DOCNO
		                            , vt.PROPERTYDESC_TH AS VEHICLERENTALTYPE
		                            , n.NOTIFICATIONID
		                            , n.NOTICE_TYPE
		                            , ln.PROPERTYDESC_TH AS LESSORNAME
		                            , ass.MODEL
		                            , ass.ENGINE_NUMBER
		                            , ass.VEHICLE_LICENSE
                                , ass.RENTAMOUNT
		                            , ass.RENTAL_EFFECTIVEDATE
		                            , ass.RENTAL_EXPIREDATE
                                , ass.INSURANCE_EFFECTIVEDATE
		                            , ass.INSURANCE_EXPIREDATE
                                , ass.INSURANCEBROKER
                                , ass.INSURANCENUMBER
                                , ass.CARACT_EFFECTIVEDATE
		                            , ass.CARACT_EXPIREDATE
                                , ass.VEHICLETAX_EFFECTIVEDATE
		                            , ass.VEHICLETAX_EXPIREDATE
                                , n.NOTICEDATE
                                , n.PAYMENTDATE
									, n.CONDITIONEXPIREDATE
                                    , (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST
									, (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY
									, va.PROPERTYDESC_TH AS VEHICLEALERTTYPE
                                    , ud.DEPARTMENT

                            FROM STBLNOTIFICATION n
                            LEFT JOIN dbo.STBLREQUEST r ON n.REQID = r.REQID
                            LEFT JOIN STBLDOCUMENT_VEHICLERENTAL a ON a.REQID = r.REQID
                            LEFT JOIN STBLASSETINFO ass ON ass.REQID = r.REQID AND ass.ASSETINFOID = n.ASSETINFOID
                            LEFT JOIN dbo.ZTBLLESSORNAME ln ON ln.PROPERTYID = a.LESSORNAME
							LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                            LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID
                            LEFT JOIN dbo.ZTBLVEHICLEALERTTYPE va ON n.NOTICE_TYPE = va.PROPERTYNAME
                            LEFT JOIN dbo.ZTBLVEHICLETYPE vt ON vt.PROPERTYID = a.VEHICLERENTALTYPEID
                            LEFT JOIN dbo.ESN_USER u ON u.USERID = ass.DRIVERID
							LEFT JOIN --Start Special CJ Express
							(
								SELECT u.USERNAME , 
									   d.PROPERTYID AS DEPARTMENTID ,
									   d.PROPERTYNAME AS COSTCENTER ,
									   d.PROPERTYDESC_TH AS DEPARTMENT
								FROM dbo.ESN_USER_PROPERTY u
								INNER JOIN dbo.ZTBLDEPARTMENT d
								ON u.PROPERTYID = d.PROPERTYID
								WHERE u.PROPERTY = 21
							) ud ON ud.USERNAME = u.USERNAME";

        private const string SQL_REQUEST_VEHICLERENTAL = @"
                            SELECT DISTINCT * FROM (
                            SELECT
								r.*,
								a.VEHICLERENTAL_DOCNO,
                                ln.PROPERTYDESC_TH AS LESSORNAME ,
                                a1.RENTAL_EFFECTIVEDATE,
				                a1.RENTAL_EXPIREDATE,
                                a2.PROPERTYDESC_TH AS VEHICLERENTALTYPE,
                                st.STATUSNAME_TH AS STATUS,
                                (ur.NAME_TH + ' ' + ur.LASTNAME_TH) AS USERREQUEST,
                                (uv.NAME_TH + ' ' + uv.LASTNAME_TH) AS USERVERIFY
                            FROM dbo.STBLREQUEST r
                                LEFT JOIN dbo.STBLDOCUMENT_VEHICLERENTAL a ON r.REQID = a.REQID
                                INNER JOIN ( SELECT t1.REQID, t1.RENTAL_EFFECTIVEDATE, t1.RENTAL_EXPIREDATE FROM (
                                                SELECT REQID, MIN(RENTAL_EFFECTIVEDATE) AS RENTAL_EFFECTIVEDATE,
							                    MAX(RENTAL_EXPIREDATE) AS RENTAL_EXPIREDATE
							                    FROM dbo.STBLASSETINFO
							                    GROUP BY REQID) t1
							                    RIGHT JOIN (SELECT REQID
										                FROM dbo.STBLASSETINFO
										                WHERE (ISNULL(MODEL,'') LIKE '%{0}%') 
                                                        AND (ISNULL(ENGINE_NUMBER,'') LIKE '%{1}%')
										                AND (ISNULL(VEHICLE_LICENSE,'') LIKE '%{2}%')
										                GROUP BY REQID) t2 ON t1.REQID = t2.REQID) a1 
							                ON r.REQID = a1.REQID
                                LEFT JOIN dbo.ZTBLVEHICLETYPE a2 ON a2.PROPERTYID = a.VEHICLERENTALTYPEID
                                LEFT JOIN dbo.ESN_STATUS st on r.REQUESTSTATUS = st.STATUSID
                                LEFT JOIN dbo.ESN_USER ur ON r.USERREQUESTID = ur.USERID
                                LEFT JOIN dbo.ESN_USER uv ON r.USERVERIFYID = uv.USERID
                                LEFT JOIN dbo.ZTBLLESSORNAME ln ON ln.PROPERTYID = a.LESSORNAME";

        #endregion Constant variables

        #region Private variables
        private SQLconnect conn;
        #endregion

        #region Constructors

        /// <summary>
        /// Class constructor.
        /// </summary>
        public SearchDAO()
        {
            conn = new SQLconnect();
        }

        #endregion Constructors

        #region Methods

        /// <summary>
        /// Get request search by specified properties
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<SearchRequestStatusResultModel> GetRequestSearchByProperty(SearchRequestStatusModel model)
        {
            var sql = new StringBuilder();

            #region Base SQL

            switch (model.PAGE)
            {
                case "ALERT_100":
                case "ALERT_300":
                    sql.Append(SQL_REQUEST_NOTIFICATION);
                    break;

                case "ALERT_200":
                    sql.Append(SQL_REQUEST_LANDLEASERATE);
                    break;

                case "APPROVE_300":
                case "SEARCH_300":
                case "REQ_1000":
                case "REQ_1200":
                case "ALERT_900":
                    sql.Append(SQL_REQUEST_SPACERENTAL);
                    break;

                case "ALERT_500":
                case "ALERT_600":
                    sql.Append(SQL_REQUEST_SPACERENTAL_NOTIFICATION);
                    break;

                case "REQ_1100":
                case "REQ_1300":
                case "APPROVE_400":
                case "SEARCH_400":
                case "ALERT_1000":
                    //sql.Append(SQL_REQUEST_VEHICLERENTAL);
                    break;

                case "ALERT_700":
                case "ALERT_800":
                    sql.Append(SQL_REQUEST_VEHICLERENTAL_NOTIFICATION);
                    break;

                default:
                    sql.Append(SQL_REQUEST);
                    break;
            }

            #endregion Base SQL

            #region Filters

            var filter = new List<string>();
            var assetFilter = new List<string>();

            // Last Revision
            if (model.LASTREVISIONFLAG > 0)
            {
                filter.Add(String.Format("r.LASTREVISIONFLAG = {0}", model.LASTREVISIONFLAG.ToString()));
            }

            // DocTypeId
            if (model.DOCTYPEID > 0)
            {
                filter.Add(String.Format("r.DOCTYPEID = {0}", model.DOCTYPEID.ToString()));
            }

            // DocRunNo
            if (!String.IsNullOrWhiteSpace(model.DOCRUNNO))
            {
                filter.Add(String.Format("r.DOCRUNNO LIKE '%{0}%'", model.DOCRUNNO));
            }

            // StoreCode
            if (!String.IsNullOrWhiteSpace(model.STORECODE))
            {
                filter.Add(String.Format("r.STORECODE = '{0}'", model.STORECODE));
            }

            // AgreementType
            if (model.AGREEMENTTYPEID.HasValue)
            {
                filter.Add(String.Format("a.AGREEMENTTYPEID = {0}", model.AGREEMENTTYPEID.Value));
            }

            // LicenseType
            if (model.LICENSETYPEID.HasValue)
            {
                filter.Add(String.Format("l.LICENSETYPEID = {0}", model.LICENSETYPEID.Value));
            }

            // RequestStatusId
            if (model.REQUESTSTATUS >= 0)
            {
                filter.Add(String.Format("r.REQUESTSTATUS = {0}", model.REQUESTSTATUS));
            }
            else if (!String.IsNullOrEmpty(model.MENU))
            {
                filter.Add(String.Format("r.REQUESTSTATUS IN (SELECT Data FROM dbo.Split((SELECT LOOKUP FROM dbo.ESN_MENU WHERE MENUVIEWID = '{0}'),','))", model.MENU));
            }

            // UserRequestId
            if (model.USERREQUESTID >= 0)
            {
                filter.Add(String.Format("r.USERREQUESTID = {0}", model.USERREQUESTID));
            }

            // UserVerifyId
            if (model.USERVERIFYID >= 0)
            {
                filter.Add(String.Format("r.USERVERIFYID = {0}", model.USERVERIFYID));
            }

            // EffectiveDate Range
            if (model.EFFECTIVEDATE_FROM.HasValue && model.EFFECTIVEDATE_TO.HasValue)
            {
                if (model.PAGE == "APPROVE_400" || model.PAGE == "SEARCH_400" || model.PAGE == "REQ_1100" || model.PAGE == "REQ_1300" || model.PAGE == "ALERT_1000")
                {
                    filter.Add(String.Format("(a1.RENTAL_EFFECTIVEDATE >= '{0}' AND a1.RENTAL_EFFECTIVEDATE <= '{1}')",
                    model.EFFECTIVEDATE_FROM.Value.ToString(DB_DATE_FORMAT),
                    model.EFFECTIVEDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }
                else
                {
                    filter.Add(String.Format("(r.DOC_EFFECTIVEDATE >= '{0}' AND r.DOC_EFFECTIVEDATE <= '{1}')",
                    model.EFFECTIVEDATE_FROM.Value.ToString(DB_DATE_FORMAT),
                    model.EFFECTIVEDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }
            }

            // ExpireDate Range
            if (model.EXPIREDATE_FROM.HasValue && model.EXPIREDATE_TO.HasValue)
            {
                if (model.PAGE == "APPROVE_400" || model.PAGE == "SEARCH_400" || model.PAGE == "REQ_1100" || model.PAGE == "REQ_1300" || model.PAGE == "ALERT_1000")
                {
                    filter.Add(String.Format("(a1.RENTAL_EXPIREDATE >= '{0}' AND a1.RENTAL_EXPIREDATE <= '{1}')",
                    model.EXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT),
                    model.EXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }
                else
                {
                    filter.Add(String.Format("(r.DOC_EXPIREDATE >= '{0}' AND r.DOC_EXPIREDATE <= '{1}')",
                    model.EXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT),
                    model.EXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }
            }

            // UpdateDate Range
            if (model.UPDATEDATE_FROM.HasValue && model.UPDATEDATE_TO.HasValue)
            {
                filter.Add(String.Format("(CONVERT(DATE, r.LASTUPDATE) >= '{0}' AND CONVERT(DATE, r.LASTUPDATE) <= '{1}')",
                    model.UPDATEDATE_FROM.Value.ToString(DB_DATE_FORMAT),
                    model.UPDATEDATE_TO.Value.ToString(DB_DATE_FORMAT)));
            }

            // Notice Date From
            if (model.NOTICEDATE_FROM.HasValue)
            {
                filter.Add(String.Format("CONVERT(DATE, n.NOTICEDATE) >= '{0}'", model.NOTICEDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
            }

            // Notice Date To
            if (model.NOTICEDATE_TO.HasValue)
            {
                filter.Add(String.Format("CONVERT(DATE, n.NOTICEDATE) <= '{0}'", model.NOTICEDATE_TO.Value.ToString(DB_DATE_FORMAT)));
            }

            // Condition Expire Date From
            if (model.CONDITIONEXPIREDATE_FROM.HasValue)
            {
                filter.Add(String.Format("CONVERT(DATE, n.CONDITIONEXPIREDATE) >= '{0}'", model.CONDITIONEXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
            }

            // Condition Expire Date To
            if (model.CONDITIONEXPIREDATE_TO.HasValue)
            {
                filter.Add(String.Format("CONVERT(DATE, n.CONDITIONEXPIREDATE) <= '{0}'", model.CONDITIONEXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
            }

            // Condition PAYMENTDATE From
            if (model.PAYMENTDATE_FROM.HasValue)
            {
                filter.Add(String.Format("CONVERT(DATE, n.PAYMENTDATE) >= '{0}'", model.PAYMENTDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
            }

            // Condition PAYMENTDATE To
            if (model.PAYMENTDATE_TO.HasValue)
            {
                filter.Add(String.Format("CONVERT(DATE, n.PAYMENTDATE) <= '{0}'", model.PAYMENTDATE_TO.Value.ToString(DB_DATE_FORMAT)));
            }

            // SPACERENTAL_DOCNO
            if (!String.IsNullOrWhiteSpace(model.SPACERENTAL_DOCNO))
            {
                filter.Add(String.Format("a.SPACERENTAL_DOCNO LIKE '%{0}%'", model.SPACERENTAL_DOCNO));
            }

            // VEHICLERENTAL_DOCNO
            if (!string.IsNullOrEmpty(model.VEHICLERENTAL_DOCNO))
            {
                filter.Add(string.Format("a.VEHICLERENTAL_DOCNO LIKE '%{0}%'", model.VEHICLERENTAL_DOCNO));
            }

            // SPACERENTALTYPEID
            if (model.SPACERENTALTYPEID.GetValueOrDefault() > 0)
            {
                filter.Add(String.Format("a.SPACERENTALTYPEID = {0}", model.SPACERENTALTYPEID));
            }

            // VEHICLERENTALTYPEID
            if (model.VEHICLERENTALTYPEID.GetValueOrDefault() > 0)
            {
                filter.Add(String.Format("a.VEHICLERENTALTYPEID = {0}", model.VEHICLERENTALTYPEID));
            }

            // LESSORNAME
            if (!string.IsNullOrEmpty(model.LESSORNAME))
            {
                //filter.Add(string.Format("a.LESSORNAME LIKE '%{0}%'", model.LESSORNAME));
                filter.Add(string.Format("a.LESSORNAME ='{0}'", model.LESSORNAME));
            }

            // Vehicle Rental Type ID
            if (model.VEHICLERENTALTYPEID.GetValueOrDefault() > 0)
            {
                filter.Add(String.Format("a.VEHICLERENTALTYPEID = {0}", model.VEHICLERENTALTYPEID));
            }

            if (model.LESSORNAMEID.GetValueOrDefault() > 0)
            {
                filter.Add(String.Format("ln.PROPERTYID = {0}", model.LESSORNAMEID.Value));
            }

            // Vehicle Alert Type
            if (!String.IsNullOrWhiteSpace(model.VEHICLEALERTTYPENAME))
            {
                filter.Add(String.Format("n.NOTICE_TYPE = '{0}'", model.VEHICLEALERTTYPENAME));
            }

            // For "APPROVE_400", "SEARCH_400", "REQ_1100", "REQ_1300" Not Use This.
            if (model.PAGE != "APPROVE_400" && model.PAGE != "SEARCH_400" && model.PAGE != "REQ_1100" && model.PAGE != "REQ_1300" && model.PAGE != "ALERT_1000")
            {
                // Model
                if (!String.IsNullOrWhiteSpace(model.MODEL))
                {
                    filter.Add(String.Format("ass.MODEL LIKE '%{0}%'", model.MODEL));
                }

                // Engine Number
                if (!String.IsNullOrWhiteSpace(model.ENGINE_NUMBER))
                {
                    filter.Add(String.Format("ass.ENGINE_NUMBER LIKE '%{0}%'", model.ENGINE_NUMBER));
                }

                // Vehicle License
                if (!String.IsNullOrWhiteSpace(model.VEHICLE_LICENSE))
                {
                    filter.Add(String.Format("ass.VEHICLE_LICENSE LIKE '%{0}%'", model.VEHICLE_LICENSE));
                }

                // Rental Effective Date From
                if (model.RENTAL_EFFECTIVEDATE_FROM.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.RENTAL_EFFECTIVEDATE) >= '{0}'", model.RENTAL_EFFECTIVEDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
                }

                // Rental Effective Date To
                if (model.RENTAL_EFFECTIVEDATE_TO.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.RENTAL_EFFECTIVEDATE) <= '{0}'", model.RENTAL_EFFECTIVEDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }

                // Rental Expire Date From
                if (model.RENTAL_EXPIREDATE_FROM.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.RENTAL_EXPIREDATE) >= '{0}'", model.RENTAL_EXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
                }

                // Rental Expire Date To
                if (model.RENTAL_EXPIREDATE_TO.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.RENTAL_EXPIREDATE) <= '{0}'", model.RENTAL_EXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }

                // Insurance Expire Date From
                if (model.INSURANCE_EXPIREDATE_FROM.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.INSURANCE_EXPIREDATE) >= '{0}'", model.INSURANCE_EXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
                }

                // Insurance Expire Date To
                if (model.INSURANCE_EXPIREDATE_TO.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.INSURANCE_EXPIREDATE) <= '{0}'", model.INSURANCE_EXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }

                // Car Act Expire Date From
                if (model.CARACT_EXPIREDATE_FROM.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.CARACT_EXPIREDATE) >= '{0}'", model.CARACT_EXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
                }

                // Car Act Expire Date To
                if (model.CARACT_EXPIREDATE_TO.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.CARACT_EXPIREDATE) <= '{0}'", model.CARACT_EXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }

                // Vehicle Tax Expire Date From
                if (model.VEHICLETAX_EXPIREDATE_FROM.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.VEHICLETAX_EXPIREDATE) >= '{0}'", model.VEHICLETAX_EXPIREDATE_FROM.Value.ToString(DB_DATE_FORMAT)));
                }

                // Vehicle Tax Expire Date To
                if (model.VEHICLETAX_EXPIREDATE_TO.HasValue)
                {
                    filter.Add(String.Format("CONVERT(DATE, ass.VEHICLETAX_EXPIREDATE) <= '{0}'", model.VEHICLETAX_EXPIREDATE_TO.Value.ToString(DB_DATE_FORMAT)));
                }

            }

            #endregion Filters

            #region Asset Filter

            // MODEL
            if (!string.IsNullOrEmpty(model.MODEL))
            {
                assetFilter.Add(model.MODEL);
            }
            else
            {
                assetFilter.Add(string.Empty);
            }

            // ENGINE_NUMBER
            if (!string.IsNullOrEmpty(model.ENGINE_NUMBER))
            {
                assetFilter.Add(model.ENGINE_NUMBER);
            }
            else
            {
                assetFilter.Add(string.Empty);
            }

            // VEHICLE_LICENSE
            if (!string.IsNullOrEmpty(model.VEHICLE_LICENSE))
            {
                assetFilter.Add(model.VEHICLE_LICENSE);
            }
            else
            {
                assetFilter.Add(string.Empty);
            }

            // REQUEST_VEHICLERENTAL
            if (model.PAGE == "APPROVE_400" || model.PAGE == "SEARCH_400" || model.PAGE == "REQ_1100" || model.PAGE == "REQ_1300" || model.PAGE == "ALERT_1000")
            {
                string sqlQuery = String.Format(SQL_REQUEST_VEHICLERENTAL, assetFilter.ToArray());
                sql.Append(sqlQuery);
            }
            #endregion

            #region Page-specific filters

            const string LABEL_FILTER_NOTICEDATE = "FILTER_NOTICEDATE";
            switch (model.PAGE)
            {
                // Only expire notice type
                case "ALERT_100":
                    filter.Add("n.NOTICE_TYPE = 'EXPIRE'");
                    goto case LABEL_FILTER_NOTICEDATE;

                case "ALERT_300":
                    filter.Add("n.NOTICE_TYPE = 'LISENCEEXPIRE'");
                    goto case LABEL_FILTER_NOTICEDATE;

                case "ALERT_500":
                    filter.Add("n.NOTICE_TYPE = 'SPACERANTALEXPIRE'");
                    goto case LABEL_FILTER_NOTICEDATE;

                // Only payment notice type
                case "ALERT_200":
                    filter.Add("n.NOTICE_TYPE = 'PAYMENT'");
                    // Show notice when notice date <= present only <Request by SA (Kat, Phet) confirm at 27/03/2018>
                    goto case LABEL_FILTER_NOTICEDATE;

                case "ALERT_600":
                    filter.Add("n.NOTICE_TYPE = 'SPACEPAYMENT'");
                    goto case LABEL_FILTER_NOTICEDATE;

                case "ALERT_700":
                    filter.Add("n.NOTICE_TYPE IN ('CAREXPIRE', 'INSURANCE', 'CARACT', 'VEHICLETAX')");
                    goto case LABEL_FILTER_NOTICEDATE;

                case "ALERT_800":
                    filter.Add("n.NOTICE_TYPE = 'VEHICLEPAYMENT'");
                    goto case LABEL_FILTER_NOTICEDATE;

                // dummy case to add NOTICEDATE filter
                case LABEL_FILTER_NOTICEDATE:
                    filter.Add(String.Format("n.NOTICEDATE <= '{0}'", DateTime.Now.ToString(DB_DATE_FORMAT)));
                    break;
            }

            #endregion Page-specific filters

            if (filter.Count > 0)
            {
                sql.AppendLine();
                sql.Append(" WHERE ");
                sql.AppendLine(String.Join(" AND ", filter));
            }


            sql.Append(" ) tbl ");

            #region Additional filters

            // VendorName
            if (!String.IsNullOrEmpty(model.VENDORNAME))
            {
                sql.AppendLine(String.Format(" WHERE tbl.VENDORNAMES LIKE '%{0}%'", model.VENDORNAME));
            }

            // Order By Last Update
            sql.Append(" ORDER BY tbl.LASTUPDATE DESC ");

            #endregion Additional filters

            var executedResult = conn.GetSQLQueryStirng<SearchRequestStatusResultModel>(sql.ToString());
            return executedResult;
        }

        /// <summary>
        /// Get request status list.
        /// </summary>
        /// <returns></returns>
        public List<RequestStatusModel> GetRequestStatusList()
        {
            const string sql = "SELECT * FROM dbo.ESN_STATUS ORDER BY STATUSID";

            var executedResult = conn.GetSQLQueryStirng<RequestStatusModel>(sql);
            return executedResult;
        }

        #endregion Methods

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        /// <summary>
        /// Dispose
        /// </summary>
        /// <param name="disposing"></param>
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

        /// <summary>
        /// This code added to correctly implement the disposable pattern.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
        }
        #endregion
    }
}
