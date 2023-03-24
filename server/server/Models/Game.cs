using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using server.Models.DAL;

namespace server.Models
{
    public class Game
    {   
        int id;
        string date;
        string spy;
        string agents;
        int steps;
        string winner;

        static GamesServices gs = new GamesServices();


        public Game() { }
        public Game(string date, string spy, string agents, int steps, string winner)
        {
            this.date = date;
            this.spy = spy;
            this.agents = agents;
            this.steps = steps;
            this.winner = winner;
        }

        public string Date { get => date; set => date = value; }
        public string Spy { get => spy; set => spy = value; }
        public string Agents { get => agents; set => agents = value; }
        public int Steps { get => steps; set => steps = value; }
        public string Winner { get => winner; set => winner = value; }
        public int Id { get => id; set => id = value; }

        public Game AddGame()
        {
            return gs.AddGame(this);
        }

        public List<Game> GetPlayerGames(string email)
        {
            GamesServices gs = new GamesServices(); //?? why wasn't there
            return gs.GetPlayerGames(email);
        }
        public List<dynamic> GetGlobalLeaderboard()
        {
            GamesServices gs = new GamesServices();
            return gs.GetGlobalLeaderboard();
        }
        public List<dynamic> GetSpyLeaderboard()
        {
            GamesServices gs = new GamesServices();
            return gs.GetSpyLeaderboard();
        }
        public List<dynamic> GetAgentsLeaderboard()
        {
            GamesServices gs = new GamesServices();
            return gs.GetAgentsLeaderboard();
        }
        
    }
}