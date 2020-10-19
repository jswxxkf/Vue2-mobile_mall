<?php

namespace dao;

use bean\User;
use PDO, PDOException;

class UserDAO
{
    private $pdo;
    private $fetch_mode;

    public function __construct($info = array(), $drivers = array())
    {
        $type = $info['type'] ?? 'mysql';
        $host = $info['host'] ?? '106.54.80.108';
        $port = $info['port'] ?? '3306';
        $user = $info['user'] ?? 'root';
        $pass = $info['pass'] ?? '138476Sch';
        $dbname = $info['dbname'] ?? 'my_database';
        $charset = $info['charset'] ?? 'utf8';
        $this->fetch_mode = $info['fetch_mode'] ?? PDO::FETCH_ASSOC;
        # 驱动控制：异常模式处理
        $drivers[PDO::ATTR_ERRMODE] = $drivers[PDO::ATTR_ERRMODE] ?? PDO::ERRMODE_EXCEPTION;
        # 实例化PDO对象
        try {
            $this->pdo = @new PDO($type . ':host=' . $host . ';port=' . $port . ';dbname=' . $dbname, $user, $pass, $drivers);
        } catch (PDOException $e) {
            echo '数据库连接失败！<br/>';
            echo '错误文件为：' . $e->getFile() . '<br/>';
            echo '错误行号为：' . $e->getLine() . '<br/>';
            echo '错误描述为：' . $e->getMessage() . '<br/>';
            die();
        }
        # 设定字符集
        try {
            $this->pdo->exec("set names {$charset}");
        } catch (PDOException $e) {
            # 调用异常处理方法
            $this->dao_exception($e);
        }
    }

    # SQL执行错误的异常处理
    private function dao_exception(PDOException $e)
    {
        echo 'SQL执行错误！<br/>';
        echo '错误文件为：' . $e->getFile() . '<br/>';
        echo '错误行号为：' . $e->getLine() . '<br/>';
        echo '错误描述为：' . $e->getMessage();
        die();
    }

    # insert
    public function insert(User $user)
    {
        $stmt = $this->pdo->prepare(
            "insert into t_user (uname,pw,age,gender,role,avatar,email,phone,hometown) values (?,?,?,?,?,?,?,?,?)");
        try {
            return $stmt->execute(array($user->getUname(), $user->getPw(), $user->getAge(), $user->getGender(),
                $user->getRole(), $user->getAvatar(), $user->getEmail(), $user->getPhone(), $user->getHometown()));

        } catch (PDOException $e) {
            $this->dao_exception($e);
        }
    }

    # 获取自增长id
    public function dao_insert_id()
    {
        return $this->pdo->lastInsertId();
    }
}
