using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace server.Models.DAL
{
    public class GamesServices
    {

        List<dynamic> global_Leaderboard;
        List<dynamic> spy_Leaderboard;
        List<dynamic> agents_Leaderboard;

        public GamesServices()
        {


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

            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateInsertGame(con, game);

            command.ExecuteNonQuery();

            con.Close();

            return game;

        }
        private SqlCommand CreateInsertGame(SqlConnection con, Game game)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@date", game.Date);

            if (game.Spy != null)
            {
                command.Parameters.AddWithValue("@spy", game.Spy);
            }
            else
            {
                command.Parameters.AddWithValue("@spy", DBNull.Value);

            }
            if (game.Agents != null)
            {
                command.Parameters.AddWithValue("@agents", game.Agents);
            }
            else
            {
                command.Parameters.AddWithValue("@agents", DBNull.Value);
                
            }
            command.Parameters.AddWithValue("@steps",game.Steps);

            if (game.Winner != null && game.Winner != "Guest")
            {
                command.Parameters.AddWithValue("@winner", game.Winner);
            }
            else
            {
                command.Parameters.AddWithValue("@winner", DBNull.Value);

            }

            command.CommandText = "SP_InsertGame";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public List<Game> GetPlayerGames(string email)
        {   

            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetPlayerGames(con, email);

            SqlDataReader dr = command.ExecuteReader();

            List<Game> playerGames = new List<Game>();
            while (dr.Read())
            {
                string date = dr["date"].ToString();
                string spy = dr["spy"].ToString() != "" ? dr["spy"].ToString() : "Guest";
                string agents = dr["agents"].ToString() != "" ? dr["agents"].ToString() : "Guest";
                int steps = Convert.ToInt32(dr["steps"]);
                string winner = dr["winner"].ToString() != "" ? dr["winner"].ToString() : "Guest";


                playerGames.Add(new Game(date, spy, agents, steps, winner));
            }

            con.Close();

            return playerGames;

        }
        private SqlCommand CreateGetPlayerGames(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_GetPlayerGames";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
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