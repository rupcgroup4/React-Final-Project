using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace server.Models.DAL
{
    public class GamesServices
    {

        public GamesServices()
        {

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

            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetGlobalLeaderboard(con);

            SqlDataReader dr = command.ExecuteReader();

            List<dynamic> global_Leaderboard = new List<dynamic>();
            while (dr.Read())
            {
                int rank = Convert.ToInt32(dr["Rank"]);
                string email = dr["email"].ToString();
                float totalGames = Convert.ToInt32(dr["totalGames"]);
                int totalSteps = Convert.ToInt32(dr["totalSteps"]);
                float totalWin = Convert.ToInt32(dr["totalWin"]);
                float winrate = (totalWin / totalGames) * 100;

                global_Leaderboard.Add(new { Rank = rank, PlayerName = email, TotalGames = totalGames, WinRate = winrate.ToString("F") + '%', TotalSteps = totalSteps });
            }

            con.Close();

            return global_Leaderboard;
        }
        private SqlCommand CreateGetGlobalLeaderboard(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_GetGlobalLeaderboard";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        public List<dynamic> GetSpyLeaderboard()
        {


            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetSpyLeaderboard(con);

            SqlDataReader dr = command.ExecuteReader();

            List<dynamic> spy_Leaderboard = new List<dynamic>();
            while (dr.Read())
            {
                int rank = Convert.ToInt32(dr["Rank"]);
                string email = dr["email"].ToString();
                float totalGames = Convert.ToInt32(dr["totalGames"]);
                int totalSteps = Convert.ToInt32(dr["totalSteps"]);
                float totalWin = Convert.ToInt32(dr["totalWin"]);
                float winrate = (totalWin / totalGames) * 100;

                spy_Leaderboard.Add(new { Rank = rank, PlayerName = email, TotalGames = totalGames, WinRate = winrate.ToString("F") + '%', TotalSteps = totalSteps });
            }

            con.Close();

            return spy_Leaderboard;
        }
        private SqlCommand CreateGetSpyLeaderboard(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_GetSpyLeaderboard";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        public List<dynamic> GetAgentsLeaderboard()
        {

            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetAgentsLeaderboard(con);

            SqlDataReader dr = command.ExecuteReader();

            List<dynamic> agents_Leaderboard = new List<dynamic>();
            while (dr.Read())
            {
                int rank = Convert.ToInt32(dr["Rank"]);
                string email = dr["email"].ToString();
                float totalGames = Convert.ToInt32(dr["totalGames"]);
                int totalSteps = Convert.ToInt32(dr["totalSteps"]);
                float totalWin = Convert.ToInt32(dr["totalWin"]);
                float winrate = (totalWin / totalGames) * 100;

                agents_Leaderboard.Add(new { Rank = rank, PlayerName = email, TotalGames = totalGames, WinRate = winrate.ToString("F") + '%', TotalSteps = totalSteps });
            }

            con.Close();

            return agents_Leaderboard;
        }
        private SqlCommand CreateGetAgentsLeaderboard(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_GetAgentsLeaderboard";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


    }
}