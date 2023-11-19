// public class Driver
// {
//         /// <summary>
//         ///  גלישה לאתר מאחורי מערכת ההזדהות הממשלתית באמצעות כרטיס חכם
//         /// </summary>
//         /// <param name="url">URL</param>
//         public void GoToAuthURL(string certificateName, string url)
//         {

//             var SecurityUrl = "https://sc.t.login.gov.il/nidp/idff/sso?id=TamuzCard";
//             var SelectTamuzCardUrl = "https://t.login.gov.il/nidp/idff/sso?id=TamuzCard";
//             _driver.Navigate().GoToUrl(url);

//             GoToURL(certificateName, SecurityUrl);
//             GoToURL(certificateName, SelectTamuzCardUrl);
//             GoToURL(url);

//         }

//         /// <summary>
//         /// גלישה לאתר
//         /// </summary>
//         /// <param name="url">URL</param>
//         public void GoToURL(string url)
//         {

//             _driver.Navigate().GoToUrl(url);

//         }

//         /// <summary>
//         ///  F5 גלישה למערכת שנמצאת מאחורי כרטיס חכם
//         /// </summary>
//         /// <param name="certificateName"></param>
//         /// <param name="url"></param>
//         public void GoToURL(string certificateName, string url)
//         {
//             try
//             {
//                 UseRegistryKey.AddRegAutoSelectCertificate(certificateName, url);
//                 _driver.Navigate().GoToUrl(url);

//                 UseRegistryKey.RemoveRegAutoSelectCertificate();
//             }
//             catch (Exception e)
//             {
//                 throw new Exception("Check your url or certificate name or " + e.Message);
//             }
//         }
//     }
