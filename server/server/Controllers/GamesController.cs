using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using server.Models;

namespace server.Controllers
{
    public class GamesController : ApiController
    {
       
        // POST: api/Games
        public IHttpActionResult Post([FromBody] Game game)
        {
            try
            {
                game = game.AddGame();
                return Ok(game);
            } 
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            


        }

      
    }
}
