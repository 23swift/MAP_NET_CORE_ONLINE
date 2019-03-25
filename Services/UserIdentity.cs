using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace MAP_Web.Services
{
    public abstract class UserIdentity
    {
        private readonly IHttpContextAccessor claims;
        protected IList<Claim> identity;
        protected string user;
        protected string role;

        public UserIdentity(IHttpContextAccessor claims)
        {
            this.claims = claims;
            this.identity = claims.HttpContext.User.Claims.ToList();
            this.user = identity.SingleOrDefault(c => c.Type == "name").Value;
            this.role = "";//identity.SingleOrDefault(c => c.Type == "role").Value;  
        }
    }
}

