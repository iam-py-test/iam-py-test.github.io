<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <h2>An incomplete list of the security bugs I found</h2>
    <p>List of expoits: </p>
    <ul>
      
      <li><a href="#report-Exploit:Win64/mchj.detect">Exploit:Win64/mchj.detect</a></li>
      <li><a href="#report-Exploit:Win64/mchj.clickjack">Exploit:Win64/mchj.clickjack</a></li>
      <li><a href="#report-Exploit:Win64/msoffice.malwaredownload">Exploit:Win64/msoffice.malwaredownload</a></li>
    </ul>
    <br>
    <code>This page does not and will not post exploit code. This page only exists for the purpose of informing companies and users about these expoits. <br>
      This page only lists exploits I discovered on my own; it does not and will not list exploits discovered by other people. <br>
Any use of the information on this page to harm others or exploit this for anything other than testing is prohibited and <b>will not</b> be condoned.
    </code>
    <br>
    <h1>The exploits</h1>
    <code>Tip: Use the list to navigate to a specific expoit</code>
    
    <div id="report-Exploit:Win64/msoffice.malwaredownload">
      <h4>Exploit:Win64/msoffice.malwaredownload</h4>
      <p>Target: Microsoft Office</p>
      <p>Severity: High</p>
      <p>Description: Microsoft Office Macros are able to install malware on the target computer. </p>
      <p>Live exploits: 4 (known to me)</p>
      <p>User interaction required: Depends on security settings - required on default to enable Macros</p>
      <p>What can users do: Stop using Microsoft Office and switch to something like <a href="https://en.wikipedia.org/wiki/LibreOffice">LibreOffice</a>, do not enable Macros</p>
      <p>More information:<br>
        <a href="https://www.fortinet.com/blog/threat-research/deep-analysis-new-formbook-variant-delivered-phishing-campaign-part-I">Deep Analysis: New FormBook Variant Delivered in Phishing Campaign – Part I</a><br>
        <a href="https://www.fortinet.com/blog/threat-research/hundreds-of-urls-inside-microsoft-excel-spreads-new-dridex-trojan-variant">Hundreds of URLs Inside Microsoft Excel Spreads New Dridex Trojan Variant</a><br>
        <a href="https://www.fortinet.com/blog/threat-research/scammers-using-covid-19-coronavirus-lure-to-target-medical-suppliers">Scammers Using COVID-19/Coronavirus Lure to Target Medical Suppliers</a><br>
        <a href="https://www.joesandbox.com/analysis/413824/0/html">JOESANDBOX analysis of real malware using this expoit</a>
      </p>
    </div>
    
    <div id="report-Exploit:Win64/mchj.detect">
      <h4>Exploit:Win64/mchj.detect</h4>
      <p>Target: McAfee® WebAdvisor</p>
      <p>Severity: Medium</p>
      <p>Description: This exploit allows a website to detect McAfee WebAdvisor via an image</p>
      <p>Tested: Yes</p>
      <p>Live exploits: 0</p>
      <p>User interaction required: No</p>
      <p>What can users do: Disable McAfee WebAdvisor and update it once a patch is released</p>
      
    </div>
    
    <div id="report-Exploit:Win64/mchj.clickjack">
      <h4>Exploit:Win64/mchj.clickjack</h4>
      <p>Target: McAfee® WebAdvisor</p>
      <p>Severity: High-Medium</p>
      <p>Description: This exploit lets someone hijack McAfee WebAdvisor. </p>
      <p>Tested: Yes</p>
      <p>User interaction required: No</p>
      <p>What can users do: Disable McAfee WebAdvisor and report this bug to McAfee</p>
      <code>Due to the severity of this issue, specific details will not be posted</code>
    </div>
  </body>
  
</html>
