# About authentication to GitHub

You can securely access your account's resources by authenticating to GitHub, using different credentials depending on where you authenticate.

## About authentication to GitHub

To keep your account secure, you must authenticate before you can access certain resources on GitHub. When you authenticate to GitHub, you supply or confirm credentials that are unique to you to prove that you are exactly who you declare to be.

You can access your resources in GitHub in a variety of ways: in the browser, via GitHub Desktop or another desktop application, with the API, or via the command line. Each way of accessing GitHub supports different modes of authentication.

* Username and password (or social login) with two-factor authentication, or a passkey (GitHub Free, and GitHub Enterprise Cloud only)
* Personal access token
* SSH key

## Authenticating in your browser

If you're a member of an enterprise with managed users, you will authenticate to GitHub in your browser using your IdP. For more information, see [About Enterprise Managed Users](/en/enterprise-cloud@latest/admin/identity-and-access-management/using-enterprise-managed-users-for-iam/about-enterprise-managed-users#authenticating-as-a-managed-user) in the GitHub Enterprise Cloud documentation.

If you're not a member of an enterprise with managed users, you will authenticate using your GitHub username and password, or a passkey. You may also use two-factor authentication and SAML single sign-on, which can be required by organization and enterprise owners.

> \[!NOTE]
> As of March 2023, GitHub required all users who contribute code on GitHub.com to enable one or more forms of two-factor authentication (2FA). If you were in an eligible group, you would have received a notification email when that group was selected for enrollment, marking the beginning of a 45-day 2FA enrollment period, and you would have seen banners asking you to enroll in 2FA on GitHub.com. If you didn't receive a notification, then you were not part of a group required to enable 2FA, though we strongly recommend it.
>
> For more information about the 2FA enrollment rollout, see [this blog post](https://github.blog/2023-03-09-raising-the-bar-for-software-security-github-2fa-begins-march-13).

If you need to use multiple accounts on GitHub.com, such as a personal account and a service account, you can quickly switch between your accounts without always needing to reauthenticate each time. For more information, see [Switching between accounts](/en/authentication/keeping-your-account-and-data-secure/switching-between-accounts).

* **Username and password only**
  * You'll create a password when you create your account on GitHub. We recommend that you use a password manager to generate a random and unique password. For more information, see [Creating a strong password](/en/authentication/keeping-your-account-and-data-secure/creating-a-strong-password).
  * If you have not enabled 2FA, GitHub may ask for additional verification when you first sign in from a new or unrecognized device, such as a new browser profile, a browser where the cookies have been deleted, or a new computer. For more information, see [Verifying new devices when signing in](/en/authentication/keeping-your-account-and-data-secure/verifying-new-devices-when-signing-in).

* **Social login**
  * You'll authenticate with Google or Apple, which are the supported social login providers when you create your account on GitHub. We recommend that you also configure 2FA and add a passkey or a password as an additional account recovery mechanism.
  * If you have an existing account created with a password, you can add your social login email to the account. This allows you to use your social login identity as a first-factor (password) replacement when you sign in to GitHub.
  * You can unlink your social login identities from your GitHub email settings page. For more information, see [Unlinking your email address from a locked account](/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-your-personal-account/unlinking-your-email-address-from-a-locked-account)

* **Two-factor authentication (2FA)** (recommended)
  * If you enable two-factor authentication (2FA), after you sign in with social login or your username and password, you'll be prompted to enter a code from a time-based one-time password (TOTP) application on your mobile device or sent as a text message (SMS).

  * After you configure 2FA, your account enters a check up period for 28 days. You can leave the check up period by successfully performing 2FA within those 28 days. If you don't perform 2FA in that timespan, you'll then be asked to perform 2FA inside one of your existing GitHub sessions.

  * If you cannot perform 2FA to pass the 28th day checkup, you will be provided a shortcut that lets you reconfigure your 2FA settings. You must reconfigure your settings before you can access the rest of GitHub. For more information, see [Accessing GitHub using two-factor authentication](/en/authentication/securing-your-account-with-two-factor-authentication-2fa/accessing-github-using-two-factor-authentication#providing-a-2fa-code-when-signing-in-to-the-website) and [Configuring two-factor authentication](/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication).

  * In addition to authentication with a TOTP application or a text message, you can optionally add an alternative method of authentication with GitHub Mobile or a security key using WebAuthn. See [Configuring two-factor authentication using GitHub Mobile](/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-github-mobile) or [Configuring two-factor authentication using a security key](/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-a-security-key).

    > \[!NOTE]
    > If you cannot use any recovery methods, you have permanently lost access to your account. However, you can unlink an email address tied to the locked account. The unlinked email address can then be linked to a new or existing account. For more information, see [Unlinking your email address from a locked account](/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-your-personal-account/unlinking-your-email-address-from-a-locked-account).

* **Passkey**
  * You can add a passkey to your account to enable a secure, passwordless login. Passkeys satisfy both password and 2FA requirements, so you can complete your sign in with a single step. See [About passkeys](/en/authentication/authenticating-with-a-passkey/about-passkeys).

* **SAML single sign-on**
  * Before you can access resources owned by an organization or enterprise account that uses SAML single sign-on, you may need to also authenticate through an IdP. For more information, see [About authentication with single sign-on](/en/authentication/authenticating-with-saml-single-sign-on/about-authentication-with-saml-single-sign-on) in the GitHub Enterprise Cloud documentation.

### Session cookies

GitHub uses cookies to provide services and increase security. You can review details about GitHub's cookies in [GitHub Cookies](/en/site-policy/privacy-policies/github-cookies).

* The gist.github.com and github.com domains use separate cookies.
* GitHub typically marks a user session for deletion after two weeks of inactivity.
* GitHub does not immediately delete a session when you sign out. Periodically, GitHub automatically deletes expired sessions.

## Authenticating with GitHub Desktop

You can authenticate with GitHub Desktop using your browser. For more information, see [Authenticating to GitHub in GitHub Desktop](/en/desktop/installing-and-authenticating-to-github-desktop/authenticating-to-github-in-github-desktop).

## Authenticating with the API

You can authenticate with the API in different ways. For more information, see [Authenticating to the REST API](/en/rest/overview/other-authentication-methods).

### Authenticating to the API with a personal access token

If you want to use the GitHub REST API for personal use, you can create a personal access token. If possible, GitHub recommends that you use a fine-grained personal access token instead of a personal access token (classic). For more information about creating a personal access token, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Authenticating to the API with an app

If you want to use the API on behalf of an organization or another user, GitHub recommends that you use a GitHub App. For more information, see [About authentication with a GitHub App](/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app).

You can also create an OAuth token with an OAuth app to access the REST API. However, GitHub recommends that you use a GitHub App instead. GitHub Apps allow more control over the access and permission that the app has.

### Authenticating to the API in a GitHub Actions workflow

If you want to use the API in a GitHub Actions workflow, GitHub recommends that you authenticate with the built-in `GITHUB_TOKEN` instead of creating a token. You can grant permissions to the `GITHUB_TOKEN` with the `permissions` key.

Note that `GITHUB_TOKEN` can only access resources within the repository that contains the workflow. If you need to make changes to resources outside of the workflow repository, you will need to use a personal access token or GitHub App.

For more information, see [Use GITHUB\_TOKEN for authentication in workflows](/en/actions/security-guides/automatic-token-authentication).

## Authenticating with the command line

You can access repositories on GitHub from the command line in two ways, HTTPS and SSH, and both have a different way of authenticating. The method of authenticating is determined based on whether you choose an HTTPS or SSH remote URL when you clone the repository. For more information about which way to access, see [About remote repositories](/en/get-started/git-basics/about-remote-repositories).

### HTTPS

You can work with all repositories on GitHub over HTTPS, even if you are behind a firewall or proxy.

If you authenticate with GitHub CLI, you can either authenticate with a personal access token or via the web browser. For more information about authenticating with GitHub CLI, see [`gh auth login`](https://cli.github.com/manual/gh_auth_login).

If you authenticate without GitHub CLI, you must authenticate with a personal access token. When Git prompts you for your password, enter your personal access token. Alternatively, you can use a credential helper like [Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager/blob/main/README.md). Password-based authentication for Git has been removed in favor of more secure authentication methods. For more information, see [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Every time you use Git to authenticate with GitHub, you'll be prompted to enter your credentials, unless you cache them with a [credential helper](/en/get-started/git-basics/caching-your-github-credentials-in-git).

### SSH

You can work with all repositories on GitHub over SSH, although firewalls and proxies might refuse to allow SSH connections.

If you authenticate with GitHub CLI, the CLI will find SSH public keys on your machine and will prompt you to select one for upload. If GitHub CLI does not find a SSH public key for upload, it can generate a new SSH public/private keypair and upload the public key to your account on GitHub.com. Then, you can either authenticate with a personal access token or via the web browser. For more information about authenticating with GitHub CLI, see [`gh auth login`](https://cli.github.com/manual/gh_auth_login).

If you authenticate without GitHub CLI, you will need to generate an SSH public/private keypair on your local machine and add the public key to your account on GitHub.com. For more information, see [Generating a new SSH key and adding it to the ssh-agent](/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). Every time you use Git to authenticate with GitHub, you'll be prompted to enter your SSH key passphrase, unless you've [stored the key](/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent).

### Authorizing for SAML single sign-on

To use a personal access token or SSH key to access resources owned by an organization that uses SAML single sign-on, you must also authorize the personal token or SSH key. For more information, see [Authorizing a personal access token for use with single sign-on](/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on) or [Authorizing an SSH key for use with single sign-on](/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-an-ssh-key-for-use-with-saml-single-sign-on) in the GitHub Enterprise Cloud documentation.

## GitHub's token formats

GitHub issues tokens that begin with a prefix to indicate the token's type.

> \[!NOTE]
> Starting April 27, 2026, GitHub began a staged rollout of a stateless format (`ghs_APPID_JWT`) to all newly minted GitHub App installation tokens, making them more performant and improving the reliability of our API surface. If your application expects or relies on installation tokens being exactly 40 characters long, it may not handle this new token format correctly. You can now validate your apps and workflows using a temporary request header that lets you enable the token format on demand. For more information about the temporary header, see [the GitHub blog](https://github.blog/changelog/2026-05-15-github-app-installation-tokens-per-request-override-header).

| Token type                                 | Prefix        | More information                                                                                                                                                               |
| :----------------------------------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Personal access token (classic)            | `ghp_`        | [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)      |
| Fine-grained personal access token         | `github_pat_` | [Managing your personal access tokens](/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token) |
| OAuth access token                         | `gho_`        | [Authorizing OAuth apps](/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)                                                                                       |
| User access token for a GitHub App         | `ghu_`        | [Authenticating with a GitHub App on behalf of a user](/en/apps/creating-github-apps/authenticating-with-a-github-app/identifying-and-authorizing-users-for-github-apps)       |
| Installation access token for a GitHub App | `ghs_`        | [Authenticating as a GitHub App installation](/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)                      |
| Refresh token for a GitHub App             | `ghr_`        | [Refreshing user access tokens](/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens)                                                  |

For more information GitHub's token types and their management, see [GitHub credential types reference](/en/organizations/managing-programmatic-access-to-your-organization/github-credential-types).
