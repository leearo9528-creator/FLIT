-- 공고 작성 시 모집 셀러 유형 (전체/일반셀러/푸드트럭) 저장
ALTER TABLE public.recruitments
    ADD COLUMN IF NOT EXISTS seller_type TEXT
    CHECK (seller_type IN ('seller', 'foodtruck'));

CREATE INDEX IF NOT EXISTS idx_recruitments_seller_type
    ON public.recruitments(seller_type);
