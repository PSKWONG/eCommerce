
-- Base on the structure of the existing data 
CREATE INDEX idx_facebook_auth 
ON users 
USING GIN (facebook_auth);

-- Create an index column even without the data 
CREATE INDEX idx_facebook_id 
ON users ((facebook_auth->>'id'));