<?php

define('DBUSER', "root");
define('DBPASS', "");
class Database
{
    private $con;
    public function __construct()
    {
        $this->con = $this->db_connect();
    }

    private function db_connect()
    {
        $host = "localhost";
        $dbname = "project_management";
        try {

            $connection = new mysqli($host, DBUSER, DBPASS, $dbname);
            return $connection;

        } catch (Exception $e) {
            echo $e->getMessage();
            die;
        }
    }

    //Login auth to the database
    public function login($sql)
    {

        $con = $this->db_connect();
        $check_statement = $con->query($sql);
        if ($check_statement->num_rows > 0) {
            return $check_statement;
        } else {
            return false;
        }
    }

    //Execute sql to the database 
    public function sql_query_run($sql)
    {

        $con = $this->db_connect();
        $check_statement = $con->query($sql);
        if ($check_statement === TRUE) {
            return $check_statement;
        } else {
            return false;
        }
    }



    //Run sql no validation
    public function run_sql($sql)
    {

        $con = $this->db_connect();
        return $con->query($sql);
    }

    //Check if the data is not in the database
    public function check($sql)
    {

        $con = $this->db_connect();
        $check_statement = $con->query($sql);
        if ($check_statement->num_rows == 0) {
            return true;
        } else {
            return false;
        }
    }
    public function checkRow($sql)
    {

        $con = $this->db_connect();
        $check_statement = $con->query($sql);
        if ($check_statement->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }


    //GET method from the database


    public function get_data($sql)
    {

        $con = $this->db_connect();
        $check_statement = $con->query($sql);
        $projects = array();
        if ($check_statement->num_rows > 0) {
            while ($row = $check_statement->fetch_assoc()) {
                $projects[] = $row;
            }
            return $projects;
        } else {
            return false;
        }
    }
    public function get_invitaion($sql)
    {

        $con = $this->db_connect();
        $check_statement = $con->query($sql);
        $projects = array();
        if ($check_statement->num_rows > 0) {
            $total = 0;
            while ($row = $check_statement->fetch_assoc()) {
                $projects[] = $row;
                $total++;
            }
            return array($projects, $total);
        } else {
            return false;
        }
    }

}