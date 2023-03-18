using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.Models.DAL
{
    public class GamesServices
    {
        List<Game> games;

        public GamesServices()
        {
            games = new List<Game>();

            games.Add(new Game(new DateTime().ToString(), "yoavbkk@gmail.com", "Guest", 12, "yoavbkk@gmail.com"));
            games.Add(new Game(new DateTime().ToString(), "yoavbkk@gmail.com", "Guest", 14, "Guest"));
            games.Add(new Game(new DateTime().ToString(), "Guest", "yoavbkk@gmail.com", 17, "Guest"));


        }

        public Game AddGame(Game game)
        {
            games.Add(game);
            return game;
        }

        public List<Game> GetPlayerGames(string email)
        {   
            List<Game> playerGames = new List<Game>();
            foreach(Game game in games)
            {
                if(game.Spy == email || game.Agents == email)
                {
                    playerGames.Add(game);
                }
            }
            return playerGames;
        }
    }
}