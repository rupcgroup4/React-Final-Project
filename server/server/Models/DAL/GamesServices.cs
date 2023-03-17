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

        }

        public Game AddGame(Game game)
        {
            games.Add(game);
            return game;
        }
    }
}