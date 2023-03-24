using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace server.Models.DAL
{
    public class PlayerServices
    {

        //this function check if player exists in data base
        //get player email and return a player if found
        //else return null
        public Player getPlayerByEmail(String email)
        {
            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetPlayerByEmail(con, email);
            SqlDataReader dr = command.ExecuteReader();

            Player p = null;
            while (dr.Read())
            {
                string userEmail = dr["email"].ToString();
                string password = dr["Password"].ToString();
               // if (password != "")
               //     password = null;
                string firstName = dr["firstName"].ToString();
                string lastName = dr["lastName"].ToString();

                p = new Player(userEmail, password, firstName, lastName);
            }

            con.Close();

            return p;

        }

        //this function adds a player to the database
        //if succesfull return Player, else return null
        public Player PlayerSignUp(Player player)
        {
            SqlConnection con = SqlConnect.Connect();

            if (getPlayerByEmail(player.Email) != null) //Player email already exists in DB
                return null;

            SqlCommand command = CreateInsertPlayerCommand(con, player);
            command.ExecuteNonQuery();
            con.Close();

            return player;
        }

        //invoke stored procedure SP_getPlayerByEmail
        private SqlCommand CreateGetPlayerByEmail(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_getPlayerByEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //invoke store procedure SP_InsertPlayer
        private SqlCommand CreateInsertPlayerCommand(SqlConnection con, Player player)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", player.Email);
            command.Parameters.AddWithValue("@firstName", player.FirstName);
            command.Parameters.AddWithValue("@lastName", player.LastName);

            if (player.Password != null)
                command.Parameters.AddWithValue("@password", player.Password);
            else
                command.Parameters.AddWithValue("@password", DBNull.Value);

            command.CommandText = "SP_InsertPlayer";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

       

    }
}