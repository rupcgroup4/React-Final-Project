using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.Models;

namespace server.Controllers
{
    public class GamesController : ApiController
    {


        // POST: api/Games
        [HttpPost]
        [Route("api/games")]
        public IHttpActionResult AddGame([FromBody] Game game)
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

        [HttpPost]
        [Route("api/games/player")]
        public IHttpActionResult PlayerGame([FromBody] JObject playerEmail)
        {   
            try
            {
                string email = (string)playerEmail["email"];

                Game game = new Game();
                List<Game> playerGames = game.GetPlayerGames(email);

                return Ok(playerGames);

            } catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
  
        }
        [HttpPost]
        [Route("api/games/leaderboard")]
        public IHttpActionResult Leaderboard([FromBody] dynamic leaderboard_type)
        {
            string type = leaderboard_type.type;
            try
            {
                Game game = new Game();
                List<dynamic> leaderboard;
                switch (type)
                {
                    case "Global":
                        leaderboard = game.GetGlobalLeaderboard();
                        return Ok(leaderboard);
                    case "Spy":
                        leaderboard = game.GetSpyLeaderboard();
                        return Ok(leaderboard);
                    case "Agents":
                        leaderboard = game.GetAgentsLeaderboard();
                        return Ok(leaderboard);
                }
                return NotFound();
   
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
