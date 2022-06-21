<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">

    <#elseif section = "form">
    <div id="kc-form">
      <div id="kc-form-wrapper">
        <#if realm.password>
            <div class="fr-container">
                <div style="padding: 30px 0px;">
                    <div style="max-width: 500px; margin: 0px auto;">

            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <#if message?has_content>
                    <#if message.type == 'error'>
                    <div class="fr-alert fr-alert--error"><p class="fr-alert__title">Erreur</p><p>${kcSanitize(message.summary)}</p></div>
                    <#elseif message.type == 'warning'>
                    <div class="notification warning">${kcSanitize(message.summary)?no_esc}</div>
                    <#else>
                    <div class="notification success">${kcSanitize(message.summary)?no_esc}</div>
                    </#if>
                </#if>

                <div class="fr-input-group" style="margin-top: 30px">
                    <label for="username" class="${properties.kcLabelClass!} fr-label">Courrier électronique</label>
                    <input tabindex="1" id="username" class="${properties.kcInputClass!} fr-input" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="off"
                               aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                        />
                </div>

                <div class="fr-input-group">
                    <label for="password" class="${properties.kcLabelClass!} fr-label">Mot de passe</label>

                    <input tabindex="2" id="password" class="${properties.kcInputClass!} fr-input" name="password" type="password" autocomplete="off"
                           aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                    />
                </div>

                <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                    <div id="kc-form-options">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="checkbox">
                                <label>
                                    <#if login.rememberMe??>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                    <#else>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                    </#if>
                                </label>
                            </div>
                        </#if>
                        </div>

                  </div>

                  <div id="kc-form-buttons form__group" class="${properties.kcFormGroupClass!}">
                      <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                      <button tabindex="4" class="fr-btn--md fr-btn" name="login" id="kc-login" type="submit">Je m'identifie</button>
                      <#if realm.resetPasswordAllowed>
                        <a tabindex="5" href="${url.loginResetCredentialsUrl}">Mot de passe oublié</a>
                    </#if>
                  </div>
            </form>
             </div>
                </div>
                </div>
        </#if>
        </div>

    </div>
    <#elseif section = "info" >
        
    </#if>

</@layout.registrationLayout>
