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
-- Create date: 24.3.23
-- Description:	Insert Player into DataBase
-- =============================================
CREATE PROCEDURE SP_InsertPlayer
	-- Add the parameters for the stored procedure here
	@email nvarchar(64),
    @password nvarchar(30),
	@firstName nvarchar(30),
	@lastName nvarchar(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;

    -- Insert statements for procedure here
INSERT INTO Players ([email],[password],[firstName],[lastName])

	VALUES(@email, @password, @firstName, @lastName)
	END
GO
