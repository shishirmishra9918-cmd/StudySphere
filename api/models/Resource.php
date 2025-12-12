<?php
class Resource {
    private $conn;
    private $table_name = "resources";

    public $id;
    public $title;
    public $description;
    public $file_url;
    public $type;
    public $user_id;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    title = :title,
                    description = :description,
                    file_url = :file_url,
                    type = :type,
                    user_id = :user_id,
                    created_at = :created_at";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->file_url = htmlspecialchars(strip_tags($this->file_url));
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->created_at = date('Y-m-d H:i:s');

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":file_url", $this->file_url);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":created_at", $this->created_at);

        return $stmt->execute();
    }

    public function search($keywords) {
        $query = "SELECT * FROM " . $this->table_name . "
                WHERE title LIKE ? OR description LIKE ?
                ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);

        $keywords = "%{$keywords}%";
        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);

        $stmt->execute();
        return $stmt;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}