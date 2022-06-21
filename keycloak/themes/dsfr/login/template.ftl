<#import "header.ftl" as header>
<#import "footer.ftl" as footer>
<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/WebPage" lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow">

    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>S.P.A.C.E - Service Protection de l'Accès à la Célérité dans l'Espace</title>

  <link rel="stylesheet" href="${url.resourcesPath}/dsfr/dsfr.min.css">
  <link rel="apple-touch-icon" href="${url.resourcesPath}/dsfr/favicon/apple-touch-icon.png"><!-- 180×180 -->
  <link rel="icon" href="${url.resourcesPath}/dsfr/favicon/favicon.svg" type="image/svg+xml">
  <link rel="shortcut icon" href="${url.resourcesPath}/dsfr/favicon/favicon.ico" type="image/x-icon"><!-- 32×32 -->

    <meta name="theme-color" content="#000091" />
  </head>

  <body style="min-height: 100vh; display: flex; flex-direction: column;">
    <@header.main></@header.main>

    <main role="main">
      <section class="section section-grey" style="min-height: calc(100vh - 400px)">
        <div class="container">
          <#--  <#nested "header">  -->
          <#nested "form">
          <#nested "info">

        </div>
      </section>
    </main>
    <div style="margin-top: auto;">
      <@footer.main></@footer.main>
    </div>
  </body>
</html>
</#macro>