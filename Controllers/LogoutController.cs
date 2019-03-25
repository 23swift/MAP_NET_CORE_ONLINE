using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;

namespace MAP_Web.Controllers
{
   
    public class LogoutController : Controller
    {
         [Route("/api/logout")]
        public IActionResult Execute()
        {
            //TODO: Implement Realistic Implementation
            return SignOut(new AuthenticationProperties
            {
                RedirectUri = "/"
            }, "Cookies", "oidc");
        }
    }
}