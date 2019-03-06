using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;

namespace MAP_Web.Controllers
{
    [Route("/api/logout")]
    public class LogoutController : Controller
    {
        [HttpPost]
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