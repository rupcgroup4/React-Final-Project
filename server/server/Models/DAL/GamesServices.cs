using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.Models.DAL
{
    public class GamesServices
    {
        List<Game> games;

        List<dynamic> global_Leaderboard;
        List<dynamic> spy_Leaderboard;
        List<dynamic> agents_Leaderboard;

        public GamesServices()
        {
            games = new List<Game>();
            games.Add(new Game(new DateTime().ToString(), "yoavbkk@gmail.com", "Guest", 12, "yoavbkk@gmail.com"));
            games.Add(new Game(new DateTime().ToString(), "yoavbkk@gmail.com", "Guest", 14, "Guest"));
            games.Add(new Game(new DateTime().ToString(), "Guest", "yoavbkk@gmail.com", 17, "Guest"));

            global_Leaderboard = new List<dynamic>();

            global_Leaderboard.Add(new { Rank = "1", PlayerName = "Moshe", TotalGames = "1992", WinRate = "78.33", TotalSteps = "23921" });
            global_Leaderboard.Add(new { Rank = "2", PlayerName = "Moshe", TotalGames = "2131", WinRate = "78.33", TotalSteps = "23921" });
            global_Leaderboard.Add(new { Rank = "3", PlayerName = "Moshe", TotalGames = "1912392", WinRate = "78.33", TotalSteps = "23921" });

            spy_Leaderboard = new List<dynamic>();

            spy_Leaderboard.Add(new { Rank = "1", PlayerName = "Stav", TotalGames = "1992", WinRate = "78.33", TotalSteps = "23921" });
            spy_Leaderboard.Add(new { Rank = "2", PlayerName = "Stav", TotalGames = "2131", WinRate = "78.33", TotalSteps = "23921" });
            spy_Leaderboard.Add(new { Rank = "3", PlayerName = "Stav", TotalGames = "1912392", WinRate = "78.33", TotalSteps = "23921" });

            agents_Leaderboard = new List<dynamic>();

            agents_Leaderboard.Add(new { Rank = "1", PlayerName = "Yoav", TotalGames = "1992", WinRate = "78.33", TotalSteps = "23921" });
            agents_Leaderboard.Add(new { Rank = "2", PlayerName = "Yoav", TotalGames = "2131", WinRate = "78.33", TotalSteps = "23921" });
            agents_Leaderboard.Add(new { Rank = "3", PlayerName = "Yoav", TotalGames = "1912392", WinRate = "78.33", TotalSteps = "23921" });


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
        public List<dynamic> GetGlobalLeaderboard()
        {

            return global_Leaderboard;
        }
        public List<dynamic> GetSpyLeaderboard()
        {


            return spy_Leaderboard;
        }
        public List<dynamic> GetAgentsLeaderboard()
        {

            return agents_Leaderboard;
        }

        



    }
}