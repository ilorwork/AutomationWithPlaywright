// public static class UseRegistryKey
// {
//     public static AddRegAutoSelectCertificate(certificateName: string, env: string)
//     {
//         try
//         {
//             const policyUrl = "chrome://policy/";
//             DeleteRegFilesFromTempFile();
//             CreatRegFilesInTempFile(certificateName, env);
//             WriteRegistryUsingCMD();
//             var service = new Service();
//             service.Wait(2);
//             new Driver().GetDriver().Navigate().GoToUrl(policyUrl);
//             var reloadPoliciesbutton = new Clickable("//*[@id='reload-policies']");
//             if (reloadPoliciesbutton.WaitUntilEnabled(20))
//             {
//                 reloadPoliciesbutton.Click();
//                 new ElementBase("//*[.='No policies set']").WaitUntilDisappeared(40);
//             }
//             service.Wait(2);
//         }
//         catch (Exception e)
//         {

//         }
//     }

//     internal static void WriteRegistryUsingCMD()
//     {
//         string path = FileAdDTOReg() + "GoogleAutoSelectCertAdd.reg";
//         try
//         {
//             System.Diagnostics.ProcessStartInfo proc = new System.Diagnostics.ProcessStartInfo
//             {
//                 FileName = @"C:\Windows\regedit.exe",
//                 Arguments = @"/s " + path
//             };
//             System.Diagnostics.Process.Start(proc);
//         }
//         catch (Exception)
//         {

//             throw;
//         }
//     }

//     internal static void CreatRegFilesInTempFile(string certificateName, string env)
//     {
//         string s = "\\";
//         StreamWriter swAdd = File.CreateText(FileAdDTOReg() + @"\GoogleAutoSelectCertAdd.txt");

//         swAdd.WriteLine("Windows Registry Editor Version 5.00");
//         swAdd.WriteLine("");
//         swAdd.WriteLine(@"[HKEY_CURRENT_USER\SOFTWARE\Policies\Google\Chrome\AutoSelectCertificateForUrls]");
//         swAdd.WriteLine("\"1\"=\"{" + s + "\"pattern" + s + "\":" + s + "\"" + env + "" + s + "\"," + s + "\"filter" + s + "\":{" + s + "\"SUBJECT" + s + "\":{" + s + "\"CN" + s + "\":" + s + "\"" + certificateName + "" + s + "\"}}}\"");
//         swAdd.Close();
//         File.Move(FileAdDTOReg() + @"\GoogleAutoSelectCertAdd.txt", FileAdDTOReg() + @"\GoogleAutoSelectCertAdd.reg");

//         StreamWriter swRemove = File.CreateText(FileAdDTOReg() + @"\GoogleAutoSelectCertRemove.txt");

//         swRemove.WriteLine("Windows Registry Editor Version 5.00");
//         swRemove.WriteLine("");
//         swRemove.WriteLine(@"[-HKEY_CURRENT_USER\SOFTWARE\Policies\Google\Chrome\AutoSelectCertificateForUrls]");
//         swRemove.Close();
//         File.Move(FileAdDTOReg() + @"\GoogleAutoSelectCertRemove.txt", FileAdDTOReg() + @"\GoogleAutoSelectCertRemove.reg");
//     }

//     public static void RemoveRegAutoSelectCertificate()
//     {
//         RemoveRegistryUsingCMD();
//     }

//     internal static void RemoveRegistryUsingCMD()
//     {
//         string path = FileAdDTOReg() + "GoogleAutoSelectCertRemove.reg";
//         try
//         {
//             System.Diagnostics.ProcessStartInfo proc = new System.Diagnostics.ProcessStartInfo
//             {
//                 FileName = @"C:\Windows\regedit.exe",
//                 Arguments = @"/s " + path
//             };
//             System.Diagnostics.Process.Start(proc);
//         }
//         catch (Exception)
//         {

//             throw;
//         }
//     }
//     internal static string FileAdDTOReg()
//     {
//         string path = Path.GetTempPath();
//         return path;
//     }
//     static DeleteRegFilesFromTempFile()
//     {
//         FileInfo f = new FileInfo(FileAdDTOReg() + @"\GoogleAutoSelectCertAdd.reg");
//         FileInfo f1 = new FileInfo(FileAdDTOReg() + @"\GoogleAutoSelectCertRemove.reg");

//         try
//         {
//             f.Delete();
//             f1.Delete();
//         }
//         catch (Exception)
//         {

//         }
//     }

// }
