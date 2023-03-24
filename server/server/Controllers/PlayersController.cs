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
        
        //Player login
        public IHttpActionResult Post([FromBody] JObject emailAndPassword)
        {
            try
            {
                Player player = new Player();

                string email = (string)emailAndPassword["email"];
                string password = (string)emailAndPassword["password"];

                player = player.getPlayerByEmail(email);

                if (player != null)   //player matching the inputed email found
                {
                    if(player.Password==null || player.Password=="")
                    {
                        return Content(HttpStatusCode.BadRequest, "Please sign in with Google");
                    }
                    if (player.Password == password)//password is correct
                    {
                        return Ok(player);
                    }
                    else //password isn't correct
                    {
                        return Content(HttpStatusCode.Unauthorized, "Password is incorrect");
                    }
                }
                else //user matching the inputed email not found
                {
                    return Content(HttpStatusCode.NotFound, "Player matching the inputed email not found");
                }
            } 
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            
        }

        [HttpPost]
        [Route("api/players/googleSignUp")]
        public IHttpActionResult googleLogin([FromBody] Player player)
        {
            try
            {
                Player p = player.getPlayerByEmail(player.Email);
                if (p == null) //player isn't in DB - add player to DB
                {
                    //insert player to DB
                    player = player.PlayerSignUp();
                    if (player == null)
                    {
                        return Content(HttpStatusCode.Unauthorized, "Email already exist");
                    }
                }
                return Ok(player); //player login succesfully
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }


        [HttpPost]
        [Route("api/players/signup")]
        public IHttpActionResult SignUp([FromBody] Player player)
        {
            try
            {
                player = player.PlayerSignUp();
                if(player == null)
                {
                    return Content(HttpStatusCode.Unauthorized, "Email already exist");
                }
                return Ok(player);

            } catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            
        }

        [HttpPost]
        [Route("api/players/getPlayerGames")]
        public IHttpActionResult getPlayerGame([FromBody] JObject playerEmail)
        {
            try
            {
                string email = (string)playerEmail["email"];

                Game game = new Game();
                List<Game> playerGames = game.GetPlayerGames(email);

                return Ok(playerGames);

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }



    }
}
