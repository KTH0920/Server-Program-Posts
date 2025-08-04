const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

// 초기값 3개
let posts = [
  {
    id: 1,
    displayId: 1,
    subject: "subject-1",
    desc: "desc-1",
    createdAt: "2025-08-01",
    status: "draft",
    likes: 0,
  },
  {
    id: 2,
    displayId: 2,
    subject: "subject-2",
    desc: "desc-2",
    createdAt: "2025-08-01",
    status: "published",
    likes: 3,
  },
  {
    id: 3,
    displayId: 3,
    subject: "subject-3",
    desc: "desc-3",
    createdAt: "2025-08-01",
    status: "archived",
    likes: 1,
  },
];
let initId = 4;

// 포스트 생성
app.post("/posts", (req, res) => {
  try {
    const newPosts = {
      id: initId++,
      displayId: posts.length + 1,
      subject: req.body.subject,
      desc: req.body.desc,
      createdAt: new Date().toISOString(),
      status: req.body.status,
    };

    posts.push(newPosts);
    res.status(201).json({ message: "포스트 생성 완료", posts });
  } catch (error) {
    console.error("포스트 생성 중 오류");
    res.status(500).json({ message: "서버 오류" });
  }
});

// 포스트 전체 조회
app.get("/posts", (req, res) => {
  try {
    res.status(200).json({ message: "가져오기 성공", posts });
  } catch (error) {
    console.error("조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

// 포스트 1개 조회
app.get("/posts/:id", (req, res) => {
  try {
    const postsId = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === postsId);

    if (index === -1) {
      return res.status(404).json({ message: "조회할 포스트가 없습니다." });
    }
    res
      .status(200)
      .json({ message: "1개의 데이터 조회 완료", posts: posts[index] });
  } catch (error) {
    console.error("사용자 조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

// 포스트 수정
app.put("/posts/:id", (req, res) => {
  try {
    const postsId = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === postsId);

    if (index === -1) {
      return res.status(404).json({ message: "조회할 포스트가 없습니다." });
    }

    const updateData = req.body;

    posts[index] = {
      ...posts[index],
      ...updateData,
    };

    res
      .status(200)
      .json({ message: "1개의 데이터 조회 완료", posts: posts[index] });
  } catch (error) {
    console.error("사용자 조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

// 포스트 삭제
app.delete("/posts/:id", (req, res) => {
  try {
    const postsId = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === postsId);

    if (index === -1) {
      return res.status(404).json({ message: "조회할 포스트가 없습니다." });
    }

    posts.splice(index, 1);

    res
      .status(200)
      .json({ message: "1개의 데이터 삭제 완료", posts: posts[index] });
  } catch (error) {
    console.error("사용자 조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

// 포스트 subject 수정
app.patch("/posts/:id/subject", (req, res) => {
  try {
    const postsId = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === postsId);

    if (index === -1) {
      return res.status(404).json({ message: "조회할 포스트가 없습니다." });
    }

    const { subject } = req.body;

    if (typeof subject !== "string" || subject.trim() === "") {
      return res
        .status(400)
        .json({ message: "subject는 비어있지 않은 문자열 이어야 합니다." });
    }

    posts[index] = {
      ...posts[index],
      subject: subject.trim(),
    };

    res
      .status(200)
      .json({ message: "포스트 subject 수정 완료", posts: posts[index] });
  } catch (error) {
    console.error("사용자 조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

// 포스트 desc 수정
app.patch("/posts/:id/desc", (req, res) => {
  try {
    const postsId = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === postsId);

    if (index === -1) {
      return res.status(404).json({ message: "조회할 포스트가 없습니다." });
    }

    const { desc } = req.body;

    if (typeof desc !== "string" || desc.trim() === "") {
      return res
        .status(400)
        .json({ message: "desc 비어있지 않은 문자열 이어야 합니다." });
    }

    posts[index] = {
      ...posts[index],
      desc: desc.trim(),
    };

    res
      .status(200)
      .json({ message: "포스트 desc 수정 완료", posts: posts[index] });
  } catch (error) {
    console.error("사용자 조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

// 포스트 status 수정
app.patch("/posts/:id/status", (req, res) => {
  try {
    const postsId = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === postsId);

    if (index === -1) {
      return res.status(404).json({ message: "조회할 포스트가 없습니다." });
    }

    const { status } = req.body;

    if (typeof status !== "string" || status.trim() === "") {
      return res
        .status(400)
        .json({ message: "status 비어있지 않은 문자열 이어야 합니다." });
    }

    const ALLOWED = ["draft", "published", "archived"];

    if (!ALLOWED.includes(status)) {
      return res
        .status(400)
        .json({
          message: `status는 ${ALLOWED.join(", ")} 중 하나여야 합니다.`,
        });
    }

    posts[index] = {
      ...posts[index],
      status: status.trim(),
    };

    res
      .status(200)
      .json({ message: "포스트 status 수정 완료", posts: posts[index] });
  } catch (error) {
    console.error("사용자 조회 중 오류", error);
    res.status(500).json({ message: "서버 내부 오류 발생" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World Posts");
});

app.listen(PORT, () => {
  console.log("Server is Running");
});
