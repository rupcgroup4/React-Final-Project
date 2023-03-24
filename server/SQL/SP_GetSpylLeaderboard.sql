-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SP_GetSpyLeaderboard
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
select ROW_NUMBER() OVER(ORDER BY Count(*) DESC) AS Rank, P.email, Count(*) as 'totalGames', sum(G.steps) as 'totalSteps', 
	(select Count(*) --win rate
	from Players as P1 inner join Game as G on P.email = G.winner
	where P1.email = G.winner and P.email = G.spy) 
	as 'totalWin'
from Players as P inner join Game as G on P.email = G.spy
group by P.email
order by totalGames DESC
END
GO
