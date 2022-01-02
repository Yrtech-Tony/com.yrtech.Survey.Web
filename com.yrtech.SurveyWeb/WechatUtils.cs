using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace com.yrtech.SurveyWeb
{
    public class WechatUtils
    {
        private string WeChatRedirectUrl = "/AutoLogin";//需要被授权的页面地址
        //对页面进行授权重新返回的新地址，新地址包含code
        private string WeChatOauth2Url = @"https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&amp;redirect_uri={1}&amp;response_type=code&amp;scope=snsapi_userinfo&amp;state=STATE#123";
        private string WeChatAccessTokenUrl = @"https://api.weixin.qq.com/sns/oauth2/access_token";//网页授权access_token，获取用户唯一标识openID
        private string WeChatUserInfoUrl = @"https://api.weixin.qq.com/sns/userinfo";//获取用户信息地址
        private string WeChatAppId = "wwaa5cf6f6021f2d4f";//公众号的唯一标识
        private string WeChatAppSecret = "RflBm3oUB0aRRW5KFM2n53Bd2JMD-Sq0S_Lx46uNuzk";//公众号的appsecret
        private static string OAUTH_GETUSERINFO_URL = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=%s&code=%s";


        /// <summary>
        /// 获取授权后的URL
        /// </summary>
        /// <returns></returns>
        public async Task<ReturnJson> GetRedirectUrl()
        {
            try
            {
                string url = string.Format(WeChatOauth2Url, WeChatAppId, WeChatRedirectUrl);
                return ReturnJson.ToResult(ReturnCode.Success, new { redirectURL = url });
            }
            catch (Exception e)
            {
                return ReturnJson.ToResult(ReturnCode.ServiceError, e.Message);
            }
        }


        /// <summary>
        /// 获取用户唯一标识openID
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public OutWechatSuccessInfo GetOpenID(string code)
        {
            string sUrlpara = "appid=" + WeChatAppId + "&secret=" + WeChatAppSecret + "&code=" + code + "&grant_type=authorization_code";//请求的参数
            string jsonStr = HttpHelper.HttpGet(WeChatAccessTokenUrl, sUrlpara);

            if (jsonStr.Contains("errcode"))
            {
                return null;
            }

            //放回json解析
            OutWechatSuccessInfo result = new OutWechatSuccessInfo();
            result = JsonHelper.ParseFormJson<OutWechatSuccessInfo>(jsonStr);

            return result;
        }

        /// <summary>
        /// 拉取登录用户信息
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public OutWeChatUserInfo GetWeChatUserInfo(string accessToken, string openId)
        {
            string sUrlpara = "access_token=" + accessToken + "&openid=" + openId + "⟨=zh_CN"; ;//请求的参数
            string jsonStr = HttpHelper.HttpGet(WeChatUserInfoUrl, sUrlpara);

            if (jsonStr.Contains("errcode"))
            {
                return null;
            }

            //放回json解析
            OutWeChatUserInfo result = new OutWeChatUserInfo();
            result = JsonHelper.ParseFormJson<OutWeChatUserInfo>(jsonStr);

            return result;
        }
    }

    public class ReturnJson
    {
        public ReturnJson()
        {
            Res = new Receive();
        }

        public static ReturnJson ToResult(ReturnCode code)
        {
            ReturnJson retJson = new ReturnJson
            {
                Code = ((int)code).ToString(),
                Res = new Receive
                {
                    Data = new { },
                    Msg = code.GetEnumText()
                }
            };
            return retJson;
        }

        public static ReturnJson ToResult(ReturnCode code, string msg, object data = null)
        {
            ReturnJson retJson = new ReturnJson
            {
                Code = ((int)code).ToString(),
                Res = new Receive
                {
                    Data = data ?? new { },
                    Msg = msg ?? code.GetEnumText()
                }
            };
            return retJson;
        }

        public static ReturnJson ToResult(ReturnCode code, object data)
        {
            ReturnJson retJson = new ReturnJson
            {
                Code = ((int)code).ToString(),
                Res = new Receive
                {
                    Data = data ?? new { },
                    Msg = code.GetEnumText()
                }
            };
            return retJson;
        }

        /// <summary>
        /// 调用返回值
        /// </summary>
        public string Code { get; set; }
        public Receive Res { get; set; }

    }

    public class JsonHelper
    {
        public JsonHelper()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        /// <summary>
        /// 把对象序列化 JSON 字符串 
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="obj">对象实体</param>
        /// <returns>JSON字符串</returns>
        public static string GetJson<T>(T obj)
        {
            DataContractJsonSerializer json = new DataContractJsonSerializer(typeof(T));
            using (MemoryStream ms = new MemoryStream())
            {
                json.WriteObject(ms, obj);
                string szJson = Encoding.UTF8.GetString(ms.ToArray());
                return szJson;
            }
        }

        /// <summary>
        /// 把JSON字符串还原为对象
        /// </summary>
        /// <typeparam name="T">对象类型</typeparam>
        /// <param name="szJson">JSON字符串</param>
        /// <returns>对象实体</returns>
        public static T ParseFormJson<T>(string szJson)
        {
            T obj = Activator.CreateInstance<T>();
            using (MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(szJson)))
            {
                DataContractJsonSerializer dcj = new DataContractJsonSerializer(typeof(T));
                return (T)dcj.ReadObject(ms);
            }
        }
    }

    public class HttpHelper
    {
        /// <summary>
        /// GET请求
        /// </summary>
        /// <param name="Url">The URL.</param>
        /// <param name="postDataStr">The post data string.</param>
        /// <returns>System.String.</returns>
        public static string HttpGet(string Url, string postDataStr = "")
        {
            HttpWebRequest request =
                (HttpWebRequest)WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
            request.Method = "GET";
            request.ContentType = "text/html;charset=UTF-8";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();

            return retString;
        }
    }


    public class Receive
    {
        public Receive()
        {
            Data = new { };
        }
        public string Msg { get; set; }

        public dynamic Data { get; set; }
    }

    /// <summary>
    /// 对外使用的返回值
    /// </summary>
    public enum ReturnCode
    {
        /// <summary>
        /// 请求(或处理)成功
        /// </summary>
        [Text("请求(或处理)成功")]
        Success = 0,
        /// <summary>
        /// 参数错误
        /// </summary>
        [Text("参数错误")]
        ParameterError = 409,

        /// <summary>
        /// 请求(或处理)失败
        /// </summary>
        [Text("请求(或处理)失败")]
        Fault = 410,

        /// <summary>
        /// 系统异常
        /// </summary>
        [Text("系统异常")]
        SystemError = 500,

        /// <summary>
        /// 业务处理异常
        /// </summary>
        [Text("业务处理异常")]
        ServiceError = 501,
    }
    //    /**
    // * 根据code调微信接口获取USERID
    // *
    // * @param code
    // * @return

    // */
    //    public Dictionary<String, Object> getAccessToken(string agentFlag)
    //    {
    //        string url = string.Format(OAUTH_GETUSERINFO_URL, getAccessToken(agentFlag), code);

    //        Dictionary<String, Object> result = HttpRequest(url, "GET", null);

    //        return result;

    //    }

    //    private string getUserIdByCode(string code, string agentFlag)
    //    {
    //        string url = string.Format(OAUTH_GETUSERINFO_URL, getAccessToken(agentFlag), code);
    //        string result = "";
    //        HttpWebResponse response = null;
    //        try
    //        {
    //            HttpHelper.HTTPJsonGet(url)
    //            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
    //            response = (HttpWebResponse)request.GetResponse();
    //            string encoding = response.ContentEncoding;
    //            if (encoding == null || encoding.Length < 1)
    //            {
    //                encoding = "UTF-8"; //默认编码
    //            }
    //            StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(encoding));
    //            result = reader.ReadToEnd();

    //        }
    //        catch (Exception ex)
    //        {
    //            Console.Write("getUserIdByCode is error !" + ex.Message);
    //        }
    //        finally
    //        {
    //            response.Close();
    //        }
    //        return result;

    //    }


    //授权成功返回的信息
    public class OutWechatSuccessInfo
    {
        /// <summary>
        ///  code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
        /// </summary>
        public string code { get; set; }
        /// <summary>
        /// 接口调用凭证
        /// </summary>
        public string access_token { get; set; }
        /// <summary>
        /// access_token接口调用凭证超时时间，单位（秒）
        /// </summary>
        public int expires_in { get; set; }
        /// <summary>
        /// 用户刷新access_token
        /// </summary>
        public string refresh_token { get; set; }
        /// <summary>
        /// 授权用户唯一标识
        /// </summary>
        public string openid { get; set; }
        /// <summary>
        /// 用户授权的作用域，使用逗号（,）分隔
        /// </summary>
        public string scope { get; set; }
    }

    //拉取的用户信息
    public class OutWeChatUserInfo
    {
        /// <summary>
        ///  用户的唯一标识
        /// </summary>
        public string openid { get; set; }
        /// <summary>
        /// 用户昵称
        /// </summary>
        public string nickname { get; set; }
        /// <summary>
        /// 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
        /// </summary>
        public int sex { get; set; }
        /// <summary>
        /// 用户个人资料填写的省份
        /// </summary>
        public string province { get; set; }
        /// <summary>
        /// 普通用户个人资料填写的城市
        /// </summary>
        public string city { get; set; }
        /// <summary>
        /// 国家，如中国为CN
        /// </summary>
        public string country { get; set; }
        /// <summary>
        /// 用户头像，最后一个数值代表正方形头像大小
        /// </summary>
        public string headimgurl { get; set; }
        /// <summary>
        /// 用户特权信息
        /// </summary>
        public string privilege { get; set; }
    }


    public static class EnumExtension
    {

        private static Dictionary<string, Dictionary<string, string>> EnumCache = new Dictionary<string, Dictionary<string, string>>();

        /// <summary>
        /// 返回枚举的Text属性值
        /// </summary>
        /// <param name="en">枚举</param>
        /// <returns></returns>
        public static string GetEnumText(this Enum en)
        {
            string enString = string.Empty;
            if (null == en) return enString;
            var type = en.GetType();
            enString = en.ToString();
            if (!EnumCache.ContainsKey(type.FullName))
            {
                var fields = type.GetFields();
                Dictionary<string, string> temp = new Dictionary<string, string>();
                foreach (var item in fields)
                {
                    var attrs = item.GetCustomAttributes(typeof(TextAttribute), false);
                    if (attrs.Length == 1)
                    {
                        var v = ((TextAttribute)attrs[0]).Value;
                        temp.Add(item.Name, v);
                    }
                }
                EnumCache.Add(type.FullName, temp);
            }
            if (EnumCache[type.FullName].ContainsKey(enString))
            {
                return EnumCache[type.FullName][enString];
            }
            return enString;
        }

        /// <summary>
        /// 获取枚举的value值
        /// </summary>
        /// <param name="en">枚举对象</param>
        /// <returns></returns>
        public static string ToIntString(this Enum en)
        {
            if (en == null)
                return "";
            var t = en.GetType();
            var field = t.GetField(en.ToString());
            var e = field.GetValue(en);
            return ((int)e).ToString();
        }

    }

    public class TextAttribute : Attribute
    {
        public TextAttribute(string value)
        {
            Value = value;
        }

        public string Value { get; set; }
    }

}