using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using server.Models;

namespace server.Controllers
{
    public class PlayersController : ApiController
    {
        
        //Player log in
        public IHttpActionResult Post([FromBody] JObject emailAndPassword)
        {

            Player player = new Player();

            string email = (string)emailAndPassword["email"];
            string password = (string)emailAndPassword["password"];

            player = player.PlayerLogin(email, password);

            if (player == null) return Content(HttpStatusCode.NotFound, "User not exist");

            if(player.FirstName == null) return Content(HttpStatusCode.Unauthorized, "Password not match");
            
            return Ok(player);
        }
        

    }
}
