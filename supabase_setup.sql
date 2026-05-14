-- posts 테이블 생성 SQL
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 정책
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (true);

-- 인증된 사용자만 작성 가능 정책
CREATE POLICY "Users can insert their own posts" 
ON posts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 자신의 글만 수정 가능 정책
CREATE POLICY "Users can update their own posts" 
ON posts FOR UPDATE 
USING (auth.uid() = user_id);

-- 자신의 글만 삭제 가능 정책
CREATE POLICY "Users can delete their own posts" 
ON posts FOR DELETE 
USING (auth.uid() = user_id);
