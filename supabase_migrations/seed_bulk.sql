-- ═══════════════════════════════════════════════════════════
-- FLIT 대량 목데이터 (유저 100명 + 게시글 300개)
-- seed_mock_data.sql, seed_users_reviews_posts.sql 실행 후 실행
-- ═══════════════════════════════════════════════════════════

-- 기존 대량 시드 유저 삭제 (f1 prefix)
DELETE FROM public.post_comments WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'f1000000%');
DELETE FROM public.posts WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'f1000000%');
DELETE FROM public.reviews WHERE user_id IN (SELECT id FROM public.profiles WHERE id::text LIKE 'f1000000%');
DELETE FROM public.profiles WHERE id::text LIKE 'f1000000%';
DELETE FROM auth.users WHERE id::text LIKE 'f1000000%';

-- ═══ 유저 100명 ═══
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user1_639@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"하소율","name":"하소율"}', NOW() - interval '19 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user2_355@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"우유준","name":"우유준"}', NOW() - interval '49 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user3_138@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"윤지훈","name":"윤지훈"}', NOW() - interval '39 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user4_288@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"배민서","name":"배민서"}', NOW() - interval '33 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user5_925@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"안서진","name":"안서진"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user6_413@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이하윤","name":"이하윤"}', NOW() - interval '59 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user7_303@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"류지윤","name":"류지윤"}', NOW() - interval '13 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user8_389@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"황시우","name":"황시우"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user9_122@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"곽서진","name":"곽서진"}', NOW() - interval '33 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user10_548@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한유진","name":"한유진"}', NOW() - interval '5 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user11_118@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"서소윤","name":"서소윤"}', NOW() - interval '6 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user12_611@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정주원","name":"정주원"}', NOW() - interval '59 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user13_283@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"윤지윤","name":"윤지윤"}', NOW() - interval '24 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user14_270@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"민유진","name":"민유진"}', NOW() - interval '30 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user15_383@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"강준서","name":"강준서"}', NOW() - interval '2 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user16_518@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"노서윤","name":"노서윤"}', NOW() - interval '47 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user17_529@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정지호","name":"정지호"}', NOW() - interval '7 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user18_558@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한지안","name":"한지안"}', NOW() - interval '2 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user19_181@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"손재윤","name":"손재윤"}', NOW() - interval '28 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user20_123@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"송도현","name":"송도현"}', NOW() - interval '38 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user21_263@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유수현","name":"유수현"}', NOW() - interval '56 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user22_260@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"송지윤","name":"송지윤"}', NOW() - interval '51 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user23_575@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"허은우","name":"허은우"}', NOW() - interval '7 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user24_251@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"남채원","name":"남채원"}', NOW() - interval '57 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user25_738@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"민승우","name":"민승우"}', NOW() - interval '29 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user26_489@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"강연우","name":"강연우"}', NOW() - interval '32 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user27_196@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"노우진","name":"노우진"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user28_382@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"홍소윤","name":"홍소윤"}', NOW() - interval '20 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user29_516@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"곽다은","name":"곽다은"}', NOW() - interval '14 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user30_687@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주민준","name":"주민준"}', NOW() - interval '42 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user31_733@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"노예준","name":"노예준"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user32_450@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"백준서","name":"백준서"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user33_221@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"윤서윤","name":"윤서윤"}', NOW() - interval '60 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user34_847@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유서연","name":"유서연"}', NOW() - interval '50 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user35_908@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"홍연우","name":"홍연우"}', NOW() - interval '41 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user36_913@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"안수아","name":"안수아"}', NOW() - interval '32 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user37_926@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주하린","name":"주하린"}', NOW() - interval '23 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user38_157@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"남서연","name":"남서연"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user39_817@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"임정우","name":"임정우"}', NOW() - interval '36 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user40_414@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"배지안","name":"배지안"}', NOW() - interval '19 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user41_987@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주시윤","name":"주시윤"}', NOW() - interval '45 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user42_719@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정주원","name":"정주원"}', NOW() - interval '31 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user43_494@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"홍우진","name":"홍우진"}', NOW() - interval '26 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user44_396@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"손소윤","name":"손소윤"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user45_501@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"서서연","name":"서서연"}', NOW() - interval '18 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user46_585@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정시우","name":"정시우"}', NOW() - interval '33 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user47_805@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한현서","name":"한현서"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user48_180@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"민시윤","name":"민시윤"}', NOW() - interval '17 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user49_724@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"장하린","name":"장하린"}', NOW() - interval '44 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user50_213@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"노서윤","name":"노서윤"}', NOW() - interval '55 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user51_568@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"황지원","name":"황지원"}', NOW() - interval '20 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user52_561@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주윤서","name":"주윤서"}', NOW() - interval '54 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user53_744@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"박수아","name":"박수아"}', NOW() - interval '7 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user54_568@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정건우","name":"정건우"}', NOW() - interval '12 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user55_245@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"하하은","name":"하하은"}', NOW() - interval '54 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user56_654@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"오지원","name":"오지원"}', NOW() - interval '1 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user57_174@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"류지윤","name":"류지윤"}', NOW() - interval '5 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user58_284@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"심주원","name":"심주원"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user59_471@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주재윤","name":"주재윤"}', NOW() - interval '22 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user60_676@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한민서","name":"한민서"}', NOW() - interval '41 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user61_294@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"류윤서","name":"류윤서"}', NOW() - interval '21 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user62_330@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"박예은","name":"박예은"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user63_628@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"장서진","name":"장서진"}', NOW() - interval '12 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000064', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user64_329@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"허유준","name":"허유준"}', NOW() - interval '22 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000065', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user65_414@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주하린","name":"주하린"}', NOW() - interval '20 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000066', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user66_683@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유시은","name":"유시은"}', NOW() - interval '41 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000067', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user67_633@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"전유준","name":"전유준"}', NOW() - interval '56 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000068', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user68_847@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"임하준","name":"임하준"}', NOW() - interval '44 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000069', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user69_238@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"손수현","name":"손수현"}', NOW() - interval '28 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000070', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user70_343@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"배승현","name":"배승현"}', NOW() - interval '22 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000071', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user71_424@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"스무디트럭","name":"스무디트럭"}', NOW() - interval '14 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000072', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user72_718@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"부업러","name":"부업러"}', NOW() - interval '10 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000073', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user73_272@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"타코트럭","name":"타코트럭"}', NOW() - interval '18 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000074', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user74_416@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"망원동살이","name":"망원동살이"}', NOW() - interval '56 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000075', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user75_480@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"떡볶이천국","name":"떡볶이천국"}', NOW() - interval '1 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000076', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user76_682@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"제주살이","name":"제주살이"}', NOW() - interval '34 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000077', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user77_763@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"성수감성","name":"성수감성"}', NOW() - interval '60 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000078', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user78_294@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"망원동살이","name":"망원동살이"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000079', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user79_964@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"수원마켓","name":"수원마켓"}', NOW() - interval '57 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user80_308@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"감성셀러","name":"감성셀러"}', NOW() - interval '15 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000081', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user81_954@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"캔들메이커","name":"캔들메이커"}', NOW() - interval '33 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000082', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user82_147@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"소품마니아","name":"소품마니아"}', NOW() - interval '46 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user83_171@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"광주플리","name":"광주플리"}', NOW() - interval '29 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000084', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user84_707@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"성수감성","name":"성수감성"}', NOW() - interval '21 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000085', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user85_871@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"소품마니아","name":"소품마니아"}', NOW() - interval '8 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000086', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user86_624@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"부산셀러","name":"부산셀러"}', NOW() - interval '49 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000087', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user87_778@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"일러스트작가","name":"일러스트작가"}', NOW() - interval '57 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000088', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user88_551@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"마켓러버","name":"마켓러버"}', NOW() - interval '11 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000089', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user89_301@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"투잡러","name":"투잡러"}', NOW() - interval '10 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000090', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user90_350@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"버거킹트럭","name":"버거킹트럭"}', NOW() - interval '40 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000091', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user91_698@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"대구마켓","name":"대구마켓"}', NOW() - interval '29 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000092', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user92_206@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한남동","name":"한남동"}', NOW() - interval '18 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000093', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user93_838@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"빈티지수집가","name":"빈티지수집가"}', NOW() - interval '57 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000094', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user94_954@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"디자이너","name":"디자이너"}', NOW() - interval '34 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000095', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user95_300@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이태원감성","name":"이태원감성"}', NOW() - interval '25 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000096', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user96_857@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"크레페트럭","name":"크레페트럭"}', NOW() - interval '25 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000097', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user97_564@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"작가생활","name":"작가생활"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000098', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user98_536@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"어묵바","name":"어묵바"}', NOW() - interval '35 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000099', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user99_532@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"디자이너","name":"디자이너"}', NOW() - interval '15 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user100_599@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"마켓고수","name":"마켓고수"}', NOW() - interval '28 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;

-- profiles 업데이트
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000001';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000002';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000003';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000004';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000005';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000006';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000007';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000008';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000009';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000010';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000011';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000012';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000013';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000014';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000015';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000016';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000017';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000018';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000019';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000020';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000021';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000022';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000023';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000024';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000025';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000026';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000027';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000028';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000029';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000030';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000031';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000032';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000033';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000034';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000035';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000036';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000037';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000038';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000039';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000040';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000041';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000042';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000043';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000044';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000045';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000046';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000047';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000048';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000049';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000050';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000051';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000052';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000053';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000054';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000055';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000056';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000057';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000058';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000059';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000060';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000061';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000062';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000063';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000064';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000065';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000066';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000067';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000068';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000069';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000070';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000071';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000072';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000073';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000074';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000075';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000076';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000077';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000078';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000079';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000080';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000081';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 5, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000082';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000083';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000084';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000085';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000086';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000087';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000088';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000089';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 5, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000090';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000091';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000092';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000093';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000094';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000095';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000096';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000097';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000098';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 5, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000099';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000100';

-- ═══ 추가 리뷰 ═══
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000003', 'seller', 4, 5, 5, 3, 3, '80~100만', ARRAY['30대','10대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000003', 'seller', 3, 5, 4, 2, 2, '40~60만', ARRAY['20대','10대'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000003', 'seller', 3, 4, 2, 5, 2, '80~100만', ARRAY['20대','30대'], ARRAY['커플 / 연인'], '합리적인 참가비', '비싼 부스비', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000003', 'seller', 5, 2, 5, 2, 4, '40~60만', ARRAY['30대','10대'], ARRAY['관광객 / 외국인'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '주최사 소통 부재', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000003', 'seller', 2, 5, 5, 3, 1, '100~150만', ARRAY['50대 이상','전 연령층'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000005', 'seller', 3, 4, 3, 4, 4, '80~100만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '친절한 운영진', '운영 미흡', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000005', 'seller', 2, 3, 5, 5, 1, '20~40만', ARRAY['30대','50대 이상'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'합리적인 참가비', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000006', 'seller', 4, 4, 5, 3, 2, '80~100만', ARRAY['30대','10대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'좋은 접근성', '주최사 소통 부재', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000007', 'seller', 3, 2, 4, 2, 5, '80~100만', ARRAY['20대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성', '좁은 통로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000007', 'seller', 3, 3, 3, 5, 5, '40~60만', ARRAY['30대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'체계적인 행사 운영', '비싼 부스비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000007', 'seller', 2, 4, 3, 3, 1, '0~20만', ARRAY['전 연령층','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'넓은 부스 공간', '좁은 통로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000007', 'seller', 2, 2, 2, 3, 3, '40~60만', ARRAY['20대','전 연령층'], ARRAY['커플 / 연인'], '좋은 접근성'||E'\n'||'높은 구매력', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000010', 'seller', 2, 3, 2, 3, 3, '0~20만', ARRAY['50대 이상','30대'], ARRAY['커플 / 연인'], '높은 집객력', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000010', 'seller', 5, 3, 4, 5, 1, '20~40만', ARRAY['30대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000012', 'seller', 4, 4, 3, 3, 3, '20~40만', ARRAY['20대','40대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000012', 'seller', 2, 3, 2, 2, 4, '0~20만', ARRAY['40대','50대 이상'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000012', 'seller', 4, 4, 3, 3, 3, '40~60만', ARRAY['10대','40대'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000013', 'seller', 4, 2, 3, 3, 2, '20~40만', ARRAY['30대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'좋은 접근성', '비싼 부스비', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000014', 'seller', 4, 3, 2, 5, 2, '20~40만', ARRAY['40대','20대'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'좋은 접근성', '비싼 부스비', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000015', 'seller', 3, 2, 5, 5, 2, '20~40만', ARRAY['20대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000015', 'seller', 2, 4, 2, 4, 5, '80~100만', ARRAY['50대 이상','30대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '좁은 부스 공간', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000015', 'seller', 5, 3, 4, 3, 4, '40~60만', ARRAY['10대','50대 이상'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '운영 미흡', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000015', 'seller', 5, 3, 2, 2, 1, '40~60만', ARRAY['20대','40대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'좋은 접근성', '그늘 없음', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000016', 'seller', 5, 5, 5, 4, 1, '100~150만', ARRAY['40대','20대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'체계적인 행사 운영', '주최사 소통 부재', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000017', 'seller', 4, 3, 3, 4, 4, '100~150만', ARRAY['전 연령층','20대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'높은 집객력', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000017', 'seller', 4, 4, 2, 2, 4, '20~40만', ARRAY['10대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '주차 불편', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000017', 'seller', 4, 4, 4, 5, 3, '80~100만', ARRAY['전 연령층'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'합리적인 참가비', '좁은 통로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000017', 'seller', 4, 5, 2, 5, 5, '0~20만', ARRAY['10대'], ARRAY['친구 / 지인'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000017', 'seller', 5, 4, 5, 4, 2, '40~60만', ARRAY['10대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력'||E'\n'||'좋은 접근성', '주최사 소통 부재', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000018', 'seller', 3, 2, 5, 5, 5, '0~20만', ARRAY['전 연령층'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'높은 집객력', '운영 미흡', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000018', 'seller', 5, 5, 3, 5, 3, '20~40만', ARRAY['전 연령층'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000019', 'seller', 2, 4, 3, 2, 1, '100~150만', ARRAY['전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간', '비싼 부스비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000019', 'seller', 2, 5, 2, 3, 1, '40~60만', ARRAY['50대 이상'], ARRAY['관광객 / 외국인'], '친절한 운영진', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000020', 'seller', 2, 4, 4, 2, 3, '0~20만', ARRAY['20대','30대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'좋은 접근성', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000020', 'seller', 4, 2, 3, 5, 3, '100~150만', ARRAY['10대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '좁은 통로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000020', 'seller', 2, 5, 4, 5, 5, '100~150만', ARRAY['50대 이상','30대'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000020', 'seller', 2, 5, 4, 5, 4, '60~80만', ARRAY['전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000020', 'seller', 3, 4, 3, 3, 5, '0~20만', ARRAY['10대','20대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000021', 'seller', 2, 3, 5, 4, 2, '60~80만', ARRAY['50대 이상','10대'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000022', 'seller', 3, 4, 2, 4, 1, '60~80만', ARRAY['전 연령층','20대'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'높은 구매력', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000023', 'seller', 2, 4, 4, 3, 5, '60~80만', ARRAY['40대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000025', 'seller', 5, 3, 3, 3, 3, '40~60만', ARRAY['40대','30대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'높은 구매력', '비싼 부스비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000025', 'seller', 5, 5, 2, 4, 1, '60~80만', ARRAY['전 연령층','50대 이상'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'좋은 접근성', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000025', 'seller', 4, 2, 4, 5, 1, '80~100만', ARRAY['20대','30대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'친절한 운영진', '비싼 부스비', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000025', 'seller', 4, 4, 5, 2, 2, '0~20만', ARRAY['40대','50대 이상'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'친절한 운영진', '비싼 부스비', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000025', 'seller', 5, 4, 2, 3, 3, '20~40만', ARRAY['40대','20대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '비싼 부스비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000026', 'seller', 2, 5, 4, 3, 1, '100~150만', ARRAY['20대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000026', 'seller', 4, 5, 5, 5, 2, '80~100만', ARRAY['20대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'체계적인 행사 운영', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000027', 'seller', 5, 5, 2, 3, 5, '80~100만', ARRAY['50대 이상'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'합리적인 참가비', '그늘 없음', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000027', 'seller', 5, 5, 3, 2, 5, '40~60만', ARRAY['30대','전 연령층'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'높은 구매력', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000028', 'seller', 2, 3, 3, 2, 5, '0~20만', ARRAY['전 연령층','20대'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000028', 'seller', 2, 4, 2, 5, 4, '80~100만', ARRAY['40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '체계적인 행사 운영'||E'\n'||'합리적인 참가비', '그늘 없음', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000028', 'seller', 2, 4, 2, 3, 4, '40~60만', ARRAY['10대','50대 이상'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'높은 집객력', '운영 미흡', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000028', 'seller', 2, 5, 4, 4, 4, '40~60만', ARRAY['20대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '운영 미흡', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000028', 'seller', 3, 5, 3, 2, 1, '40~60만', ARRAY['전 연령층','10대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'친절한 운영진', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000029', 'seller', 2, 5, 3, 5, 2, '0~20만', ARRAY['40대','20대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'높은 구매력', '좁은 부스 공간', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000031', 'seller', 2, 3, 2, 5, 3, '80~100만', ARRAY['40대','30대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'친절한 운영진', '좁은 통로', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000031', 'seller', 3, 5, 3, 3, 5, '100~150만', ARRAY['30대','10대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'높은 집객력', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000031', 'seller', 5, 4, 4, 3, 5, '0~20만', ARRAY['10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '좁은 통로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000031', 'seller', 5, 5, 2, 5, 1, '100~150만', ARRAY['20대','전 연령층'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'적극적인 SNS 홍보', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000031', 'seller', 2, 3, 5, 2, 2, '40~60만', ARRAY['10대','30대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'친절한 운영진', '좁은 부스 공간', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000033', 'seller', 4, 3, 4, 4, 1, '40~60만', ARRAY['50대 이상','20대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '홍보 부족', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000033', 'seller', 5, 4, 5, 4, 4, '40~60만', ARRAY['30대','10대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000033', 'seller', 5, 5, 2, 2, 4, '40~60만', ARRAY['전 연령층','10대'], ARRAY['가족 단위 (아이 동반)'], '높은 구매력'||E'\n'||'넓은 부스 공간', '좁은 부스 공간', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000034', 'seller', 3, 4, 5, 4, 5, '100~150만', ARRAY['30대','10대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000034', 'seller', 2, 3, 2, 4, 4, '40~60만', ARRAY['40대','30대'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'친절한 운영진', '좁은 부스 공간', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000034', 'seller', 5, 4, 2, 2, 5, '0~20만', ARRAY['20대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '높은 구매력'||E'\n'||'합리적인 참가비', '좁은 통로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000034', 'seller', 4, 5, 3, 5, 4, '80~100만', ARRAY['20대','40대'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'적극적인 SNS 홍보', '비싼 부스비', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000035', 'seller', 5, 4, 3, 4, 3, '20~40만', ARRAY['전 연령층','40대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'적극적인 SNS 홍보', '주최사 소통 부재', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000036', 'seller', 2, 3, 5, 4, 2, '0~20만', ARRAY['30대','전 연령층'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000037', 'seller', 2, 3, 4, 5, 5, '20~40만', ARRAY['20대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진', '주차 불편', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000037', 'seller', 5, 2, 4, 3, 5, '20~40만', ARRAY['30대','20대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'높은 구매력', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000037', 'seller', 5, 3, 4, 2, 3, '40~60만', ARRAY['10대','50대 이상'], ARRAY['커플 / 연인'], '높은 구매력', '주최사 소통 부재', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000037', 'seller', 3, 4, 4, 4, 5, '0~20만', ARRAY['50대 이상','30대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'적극적인 SNS 홍보', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000037', 'seller', 3, 4, 2, 2, 1, '100~150만', ARRAY['40대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '체계적인 행사 운영'||E'\n'||'적극적인 SNS 홍보', '좁은 부스 공간', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000038', 'seller', 5, 4, 3, 2, 5, '20~40만', ARRAY['전 연령층'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'적극적인 SNS 홍보', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000039', 'seller', 2, 5, 3, 5, 2, '20~40만', ARRAY['20대','전 연령층'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '그늘 없음', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000039', 'seller', 5, 3, 5, 4, 1, '0~20만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'합리적인 참가비', '비싼 부스비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000039', 'seller', 5, 3, 3, 5, 2, '80~100만', ARRAY['10대','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보', '운영 미흡', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000039', 'seller', 3, 3, 4, 4, 1, '80~100만', ARRAY['20대','40대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000039', 'seller', 2, 5, 5, 3, 3, '20~40만', ARRAY['10대','30대'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영'||E'\n'||'적극적인 SNS 홍보', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000040', 'seller', 5, 3, 4, 4, 1, '40~60만', ARRAY['전 연령층'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'친절한 운영진', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000040', 'seller', 2, 5, 5, 4, 3, '0~20만', ARRAY['전 연령층','30대'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'좋은 접근성', '비싼 부스비', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000040', 'seller', 2, 3, 5, 2, 4, '60~80만', ARRAY['전 연령층','40대'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'친절한 운영진', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000042', 'seller', 2, 2, 5, 3, 3, '80~100만', ARRAY['40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000042', 'seller', 4, 2, 2, 2, 3, '40~60만', ARRAY['30대','40대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'합리적인 참가비', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000042', 'seller', 5, 5, 3, 2, 3, '40~60만', ARRAY['전 연령층','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '운영 미흡', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000043', 'seller', 4, 3, 2, 2, 5, '60~80만', ARRAY['20대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영'||E'\n'||'높은 집객력', '좁은 통로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000043', 'seller', 2, 3, 5, 4, 3, '100~150만', ARRAY['30대','10대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '주차 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000043', 'seller', 5, 2, 2, 2, 3, '0~20만', ARRAY['10대','20대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'체계적인 행사 운영', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000043', 'seller', 4, 2, 4, 5, 3, '20~40만', ARRAY['30대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'합리적인 참가비', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000044', 'seller', 2, 4, 3, 5, 5, '80~100만', ARRAY['전 연령층'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'체계적인 행사 운영', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000044', 'seller', 3, 2, 5, 2, 3, '80~100만', ARRAY['20대','50대 이상'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'합리적인 참가비', '주최사 소통 부재', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000044', 'seller', 3, 5, 5, 3, 2, '60~80만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'적극적인 SNS 홍보', '운영 미흡', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000044', 'seller', 2, 2, 2, 3, 1, '0~20만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'친절한 운영진', '비싼 부스비', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000045', 'seller', 2, 3, 3, 4, 4, '40~60만', ARRAY['20대','50대 이상'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보', '좁은 부스 공간', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000045', 'seller', 3, 4, 2, 4, 1, '20~40만', ARRAY['50대 이상','10대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비', '좁은 부스 공간', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000047', 'seller', 3, 3, 3, 5, 3, '20~40만', ARRAY['20대','10대'], ARRAY['친구 / 지인'], '적극적인 SNS 홍보', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000047', 'seller', 2, 5, 3, 3, 5, '100~150만', ARRAY['30대','10대'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '운영 미흡', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000047', 'seller', 4, 4, 4, 3, 5, '0~20만', ARRAY['50대 이상'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진'||E'\n'||'적극적인 SNS 홍보', '비싼 부스비', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000047', 'seller', 5, 3, 5, 3, 1, '60~80만', ARRAY['30대','40대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'높은 집객력', '운영 미흡', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000048', 'seller', 3, 3, 4, 5, 2, '20~40만', ARRAY['전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000048', 'seller', 5, 3, 3, 4, 5, '60~80만', ARRAY['전 연령층','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000048', 'seller', 5, 3, 5, 2, 1, '100~150만', ARRAY['20대','30대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'높은 구매력', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000048', 'seller', 2, 4, 2, 3, 5, '0~20만', ARRAY['10대','20대'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영'||E'\n'||'합리적인 참가비', '그늘 없음', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000048', 'seller', 2, 4, 5, 5, 5, '80~100만', ARRAY['10대','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'친절한 운영진', '운영 미흡', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000049', 'seller', 5, 4, 5, 3, 4, '20~40만', ARRAY['40대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '홍보 부족', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000049', 'seller', 4, 3, 2, 4, 5, '20~40만', ARRAY['20대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'합리적인 참가비', '주최사 소통 부재', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000049', 'seller', 2, 4, 5, 4, 5, '40~60만', ARRAY['30대','전 연령층'], ARRAY['관광객 / 외국인'], '합리적인 참가비', '주최사 소통 부재', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000049', 'seller', 5, 5, 5, 3, 4, '80~100만', ARRAY['전 연령층','20대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'높은 구매력', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000050', 'seller', 5, 2, 5, 5, 1, '20~40만', ARRAY['10대','40대'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000050', 'seller', 3, 5, 2, 2, 4, '0~20만', ARRAY['40대','50대 이상'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000051', 'seller', 3, 4, 2, 2, 4, '40~60만', ARRAY['전 연령층','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000051', 'seller', 4, 2, 3, 5, 1, '40~60만', ARRAY['20대','50대 이상'], ARRAY['관광객 / 외국인'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000051', 'seller', 2, 3, 5, 4, 5, '20~40만', ARRAY['10대','20대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '운영 미흡', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000051', 'seller', 4, 3, 2, 4, 4, '20~40만', ARRAY['30대','10대'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'높은 구매력', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000052', 'seller', 2, 5, 4, 5, 3, '100~150만', ARRAY['40대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000052', 'seller', 2, 3, 4, 5, 1, '40~60만', ARRAY['40대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000052', 'seller', 3, 2, 3, 4, 4, '0~20만', ARRAY['40대','30대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000052', 'seller', 2, 5, 5, 4, 2, '20~40만', ARRAY['40대','전 연령층'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'친절한 운영진', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000053', 'seller', 3, 3, 5, 4, 3, '60~80만', ARRAY['10대','30대'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'합리적인 참가비', '좁은 부스 공간', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000053', 'seller', 3, 4, 2, 2, 4, '60~80만', ARRAY['20대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000053', 'seller', 2, 4, 4, 3, 4, '80~100만', ARRAY['50대 이상'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000053', 'seller', 3, 2, 5, 3, 3, '100~150만', ARRAY['30대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'넓은 부스 공간', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000055', 'seller', 5, 5, 3, 2, 2, '100~150만', ARRAY['전 연령층','50대 이상'], ARRAY['친구 / 지인'], '높은 집객력', '운영 미흡', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000055', 'seller', 3, 3, 4, 3, 1, '100~150만', ARRAY['20대','40대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'넓은 부스 공간', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000055', 'seller', 3, 5, 5, 4, 5, '0~20만', ARRAY['40대'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000055', 'seller', 4, 5, 3, 5, 2, '100~150만', ARRAY['50대 이상','10대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'친절한 운영진', '그늘 없음', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000055', 'seller', 3, 2, 2, 2, 2, '80~100만', ARRAY['50대 이상','전 연령층'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'높은 구매력', '그늘 없음', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000056', 'seller', 2, 5, 5, 4, 2, '80~100만', ARRAY['10대','20대'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'친절한 운영진', '주최사 소통 부재', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000057', 'seller', 5, 4, 3, 3, 1, '20~40만', ARRAY['전 연령층','20대'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'높은 구매력', '좁은 통로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000057', 'seller', 4, 3, 5, 2, 4, '100~150만', ARRAY['30대','50대 이상'], ARRAY['친구 / 지인'], '높은 구매력', '주최사 소통 부재', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000057', 'seller', 5, 2, 3, 3, 5, '0~20만', ARRAY['20대'], ARRAY['관광객 / 외국인'], '높은 집객력', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000057', 'seller', 4, 5, 3, 3, 5, '40~60만', ARRAY['20대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000057', 'seller', 2, 2, 3, 4, 3, '80~100만', ARRAY['10대','40대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'높은 구매력', '주차 불편', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000058', 'seller', 4, 3, 2, 4, 4, '40~60만', ARRAY['30대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'적극적인 SNS 홍보', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000058', 'seller', 2, 4, 2, 2, 1, '100~150만', ARRAY['50대 이상','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '좁은 통로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000059', 'seller', 2, 2, 2, 4, 2, '60~80만', ARRAY['10대','20대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'친절한 운영진', '좁은 부스 공간', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000059', 'seller', 3, 4, 4, 3, 3, '60~80만', ARRAY['50대 이상','전 연령층'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 구매력', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000059', 'seller', 4, 5, 4, 2, 2, '80~100만', ARRAY['30대','40대'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'좋은 접근성', '운영 미흡', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000059', 'seller', 5, 4, 2, 2, 5, '0~20만', ARRAY['20대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'높은 구매력', '홍보 부족', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000061', 'seller', 4, 4, 3, 5, 3, '80~100만', ARRAY['30대','40대'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000061', 'seller', 4, 3, 4, 2, 3, '100~150만', ARRAY['30대','20대'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000061', 'seller', 2, 4, 3, 5, 1, '0~20만', ARRAY['50대 이상','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력'||E'\n'||'합리적인 참가비', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000062', 'seller', 5, 5, 5, 5, 5, '100~150만', ARRAY['50대 이상','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000062', 'seller', 4, 4, 3, 5, 2, '0~20만', ARRAY['전 연령층','40대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'넓은 부스 공간', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000062', 'seller', 3, 3, 3, 2, 2, '20~40만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'높은 구매력', '좁은 통로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000063', 'seller', 3, 2, 4, 2, 5, '80~100만', ARRAY['40대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'좋은 접근성', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000065', 'seller', 3, 2, 2, 5, 5, '40~60만', ARRAY['10대','전 연령층'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'친절한 운영진', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000065', 'seller', 4, 3, 2, 3, 1, '100~150만', ARRAY['전 연령층','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'좋은 접근성', '좁은 통로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000065', 'seller', 5, 2, 3, 5, 3, '20~40만', ARRAY['40대','20대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000065', 'seller', 4, 2, 3, 3, 2, '80~100만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'높은 집객력', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000066', 'seller', 5, 4, 4, 5, 5, '20~40만', ARRAY['10대','40대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'친절한 운영진', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000066', 'seller', 4, 4, 5, 2, 4, '60~80만', ARRAY['20대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'합리적인 참가비', '운영 미흡', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000066', 'seller', 3, 3, 5, 3, 3, '100~150만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'높은 집객력', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000067', 'seller', 5, 2, 5, 3, 3, '100~150만', ARRAY['전 연령층','20대'], ARRAY['가족 단위 (아이 동반)'], '높은 구매력'||E'\n'||'적극적인 SNS 홍보', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000067', 'seller', 2, 4, 5, 3, 3, '0~20만', ARRAY['50대 이상','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'적극적인 SNS 홍보', '좁은 부스 공간', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000067', 'seller', 5, 5, 5, 4, 4, '80~100만', ARRAY['40대','50대 이상'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000068', 'seller', 2, 4, 2, 2, 5, '0~20만', ARRAY['40대'], ARRAY['커플 / 연인'], '높은 구매력', '좁은 부스 공간', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000068', 'seller', 2, 5, 4, 4, 1, '60~80만', ARRAY['50대 이상','20대'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'좋은 접근성', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000068', 'seller', 2, 2, 5, 2, 4, '20~40만', ARRAY['40대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성'||E'\n'||'높은 집객력', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000068', 'seller', 3, 4, 4, 5, 2, '20~40만', ARRAY['20대','30대'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진', '좁은 부스 공간', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000068', 'seller', 5, 5, 4, 4, 2, '80~100만', ARRAY['20대','10대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'적극적인 SNS 홍보', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000069', 'seller', 2, 3, 5, 3, 4, '60~80만', ARRAY['40대','20대'], ARRAY['커플 / 연인'], '친절한 운영진', '주최사 소통 부재', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000069', 'seller', 2, 3, 3, 4, 3, '40~60만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'높은 구매력', '비싼 부스비', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000070', 'seller', 5, 3, 2, 4, 3, '40~60만', ARRAY['전 연령층','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000070', 'seller', 5, 4, 5, 5, 2, '100~150만', ARRAY['전 연령층','10대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '홍보 부족', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000070', 'seller', 5, 3, 2, 4, 1, '60~80만', ARRAY['10대','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'높은 구매력', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000071', 'seller', 2, 5, 3, 2, 1, '80~100만', ARRAY['50대 이상','10대'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'적극적인 SNS 홍보', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000071', 'seller', 3, 4, 5, 5, 5, '100~150만', ARRAY['20대','10대'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000072', 'seller', 2, 2, 3, 3, 3, '80~100만', ARRAY['전 연령층','40대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000072', 'seller', 3, 3, 2, 4, 1, '20~40만', ARRAY['40대','20대'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'좋은 접근성', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000072', 'seller', 3, 4, 3, 3, 1, '60~80만', ARRAY['10대','40대'], ARRAY['커플 / 연인'], '좋은 접근성'||E'\n'||'체계적인 행사 운영', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000072', 'seller', 2, 4, 4, 4, 5, '80~100만', ARRAY['40대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000073', 'seller', 4, 5, 2, 5, 2, '0~20만', ARRAY['10대','40대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'높은 구매력', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000073', 'seller', 3, 5, 2, 5, 1, '100~150만', ARRAY['20대','50대 이상'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'높은 집객력', '주차 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000073', 'seller', 3, 5, 5, 5, 2, '40~60만', ARRAY['30대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'넓은 부스 공간', '홍보 부족', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000073', 'seller', 2, 3, 5, 5, 3, '20~40만', ARRAY['20대','전 연령층'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'적극적인 SNS 홍보', '좁은 부스 공간', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000073', 'seller', 4, 5, 2, 3, 2, '100~150만', ARRAY['전 연령층','10대'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000074', 'seller', 4, 5, 4, 2, 2, '40~60만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'높은 구매력', '좁은 통로', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000074', 'seller', 2, 5, 3, 4, 1, '60~80만', ARRAY['10대','30대'], ARRAY['관광객 / 외국인'], '높은 집객력', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000074', 'seller', 4, 4, 5, 3, 1, '0~20만', ARRAY['50대 이상','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '그늘 없음', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000074', 'seller', 3, 5, 2, 5, 1, '80~100만', ARRAY['40대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '넓은 부스 공간'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000074', 'seller', 2, 4, 5, 5, 2, '100~150만', ARRAY['40대','10대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 구매력', '주최사 소통 부재', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000075', 'seller', 2, 3, 2, 5, 3, '60~80만', ARRAY['전 연령층'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'친절한 운영진', '홍보 부족', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000076', 'foodtruck', 2, 3, 5, 4, 1, '70~100만', ARRAY['50대 이상','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '충분한 공간'||E'\n'||'안정적 전력 공급', '전압 불안정', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000078', 'foodtruck', 2, 2, 2, 4, 4, '200~300만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '우수한 입지'||E'\n'||'안정적 전력 공급', '좁은 진입로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000078', 'foodtruck', 5, 2, 3, 4, 1, '70~100만', ARRAY['전 연령층','30대'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'적극적인 홍보', '폐기물 처리 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000078', 'foodtruck', 4, 5, 5, 2, 5, '0~30만', ARRAY['10대','40대'], ARRAY['가족 단위 (아이 동반)'], '안정적 전력 공급'||E'\n'||'적극적인 홍보', '전압 불안정', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000078', 'foodtruck', 3, 5, 4, 4, 3, '150~200만', ARRAY['40대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '안정적 전력 공급'||E'\n'||'적극적인 홍보', '전압 불안정', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000080', 'foodtruck', 5, 5, 5, 2, 3, '0~30만', ARRAY['전 연령층','20대'], ARRAY['커플 / 연인'], '넓은 진입로'||E'\n'||'높은 집객력', '전압 불안정', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000080', 'foodtruck', 4, 2, 4, 5, 1, '30~70만', ARRAY['30대','40대'], ARRAY['커플 / 연인'], '안정적 전력 공급'||E'\n'||'높은 집객력', '좁은 진입로', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000081', 'foodtruck', 2, 4, 2, 5, 4, '30~70만', ARRAY['40대','50대 이상'], ARRAY['커플 / 연인'], '충분한 공간'||E'\n'||'안정적 전력 공급', '폐기물 처리 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000081', 'foodtruck', 5, 3, 2, 3, 5, '30~70만', ARRAY['40대','30대'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'적극적인 홍보', '좁은 진입로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000081', 'foodtruck', 4, 2, 5, 2, 2, '0~30만', ARRAY['50대 이상','10대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'충분한 공간', '전압 불안정', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000081', 'foodtruck', 3, 3, 4, 2, 1, '30~70만', ARRAY['30대','20대'], ARRAY['가족 단위 (아이 동반)'], '우수한 입지'||E'\n'||'안정적 전력 공급', '주최사 소통 부재', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 4, 4, 2, 5, 4, '70~100만', ARRAY['20대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '안정적 전력 공급'||E'\n'||'우수한 입지', '좁은 진입로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 5, 3, 5, 2, 5, '150~200만', ARRAY['30대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 홍보'||E'\n'||'높은 집객력', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 3, 2, 2, 5, 3, '30~70만', ARRAY['50대 이상'], ARRAY['친구 / 지인'], '넓은 진입로'||E'\n'||'충분한 공간', '폐기물 처리 불편', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 4, 5, 4, 2, 2, '30~70만', ARRAY['30대'], ARRAY['관광객 / 외국인'], '충분한 공간'||E'\n'||'합리적인 참가비', '전압 불안정', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 2, 2, 2, 5, 1, '70~100만', ARRAY['20대','10대'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'넓은 진입로', '좁은 진입로', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000083', 'foodtruck', 4, 5, 3, 3, 5, '200~300만', ARRAY['30대','전 연령층'], ARRAY['친구 / 지인'], '안정적 전력 공급'||E'\n'||'합리적인 참가비', '주최사 소통 부재', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000083', 'foodtruck', 5, 2, 2, 2, 3, '30~70만', ARRAY['40대','전 연령층'], ARRAY['관광객 / 외국인'], '충분한 공간'||E'\n'||'합리적인 참가비', '폐기물 처리 불편', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 2, 4, 2, 4, 4, '30~70만', ARRAY['40대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력', '폐기물 처리 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 5, 5, 4, 3, 5, '150~200만', ARRAY['10대','50대 이상'], ARRAY['관광객 / 외국인'], '우수한 입지'||E'\n'||'적극적인 홍보', '전압 불안정', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 5, 3, 2, 5, 3, '100~150만', ARRAY['20대','30대'], ARRAY['관광객 / 외국인'], '넓은 진입로'||E'\n'||'적극적인 홍보', '폐기물 처리 불편', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 2, 4, 4, 3, 1, '200~300만', ARRAY['전 연령층','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 홍보'||E'\n'||'합리적인 참가비', '좁은 진입로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000085', 'foodtruck', 3, 3, 2, 3, 4, '150~200만', ARRAY['30대','40대'], ARRAY['가족 단위 (아이 동반)'], '충분한 공간'||E'\n'||'높은 집객력', '좁은 진입로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000085', 'foodtruck', 5, 3, 3, 2, 1, '30~70만', ARRAY['30대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'충분한 공간', '좁은 진입로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 2, 4, 5, 2, 4, '150~200만', ARRAY['50대 이상','20대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'충분한 공간', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 5, 4, 4, 4, 3, '100~150만', ARRAY['전 연령층','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'충분한 공간', '좁은 진입로', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 3, 4, 4, 5, 5, '150~200만', ARRAY['50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '충분한 공간', '비싼 참가비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 5, 3, 2, 2, 3, '200~300만', ARRAY['20대'], ARRAY['가족 단위 (아이 동반)'], '우수한 입지'||E'\n'||'높은 집객력', '좁은 진입로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 2, 2, 5, 2, 5, '70~100만', ARRAY['50대 이상','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '충분한 공간', '주최사 소통 부재', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000089', 'foodtruck', 3, 3, 3, 2, 1, '200~300만', ARRAY['전 연령층','40대'], ARRAY['관광객 / 외국인'], '적극적인 홍보', '전압 불안정', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000089', 'foodtruck', 2, 4, 5, 2, 3, '100~150만', ARRAY['30대','40대'], ARRAY['가족 단위 (아이 동반)'], '안정적 전력 공급'||E'\n'||'합리적인 참가비', '좁은 진입로', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000089', 'foodtruck', 4, 4, 3, 4, 3, '70~100만', ARRAY['10대','40대'], ARRAY['친구 / 지인'], '안정적 전력 공급'||E'\n'||'높은 집객력', '비싼 참가비', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000089', 'foodtruck', 5, 2, 5, 4, 4, '200~300만', ARRAY['30대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'합리적인 참가비', '비싼 참가비', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000090', 'foodtruck', 3, 2, 4, 5, 5, '150~200만', ARRAY['전 연령층','10대'], ARRAY['관광객 / 외국인'], '안정적 전력 공급'||E'\n'||'적극적인 홍보', '좁은 진입로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000090', 'foodtruck', 3, 4, 3, 3, 5, '70~100만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'안정적 전력 공급', '비싼 참가비', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000090', 'foodtruck', 5, 3, 5, 4, 4, '100~150만', ARRAY['10대','전 연령층'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'높은 집객력', '전압 불안정', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000090', 'foodtruck', 5, 4, 5, 3, 5, '30~70만', ARRAY['20대'], ARRAY['관광객 / 외국인'], '넓은 진입로'||E'\n'||'높은 집객력', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000090', 'foodtruck', 3, 5, 4, 5, 4, '150~200만', ARRAY['50대 이상'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'충분한 공간', '전압 불안정', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 4, 2, 4, 2, 3, '70~100만', ARRAY['20대','40대'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'안정적 전력 공급', '주최사 소통 부재', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 5, 2, 5, 2, 3, '150~200만', ARRAY['40대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'충분한 공간', '폐기물 처리 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 5, 3, 3, 5, 2, '0~30만', ARRAY['전 연령층','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '충분한 공간'||E'\n'||'합리적인 참가비', '주최사 소통 부재', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000092', 'foodtruck', 2, 4, 4, 5, 5, '30~70만', ARRAY['20대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '우수한 입지'||E'\n'||'적극적인 홍보', '폐기물 처리 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000092', 'foodtruck', 2, 2, 4, 4, 4, '30~70만', ARRAY['40대','10대'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'높은 집객력', '좁은 진입로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000093', 'foodtruck', 3, 3, 2, 3, 1, '30~70만', ARRAY['10대','30대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'합리적인 참가비', '폐기물 처리 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 5, 3, 2, 4, 5, '70~100만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '적극적인 홍보'||E'\n'||'우수한 입지', '전압 불안정', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 3, 5, 5, 5, 5, '70~100만', ARRAY['20대','50대 이상'], ARRAY['관광객 / 외국인'], '넓은 진입로', '비싼 참가비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 4, 4, 2, 2, 2, '30~70만', ARRAY['20대','10대'], ARRAY['관광객 / 외국인'], '충분한 공간'||E'\n'||'합리적인 참가비', '전압 불안정', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 2, 5, 5, 5, 1, '0~30만', ARRAY['10대','30대'], ARRAY['관광객 / 외국인'], '안정적 전력 공급'||E'\n'||'높은 집객력', '좁은 진입로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000095', 'foodtruck', 2, 3, 5, 2, 1, '30~70만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '넓은 진입로'||E'\n'||'우수한 입지', '비싼 참가비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000096', 'foodtruck', 2, 2, 4, 4, 4, '30~70만', ARRAY['40대','10대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'넓은 진입로', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000096', 'foodtruck', 5, 2, 4, 3, 4, '0~30만', ARRAY['전 연령층','30대'], ARRAY['가족 단위 (아이 동반)'], '우수한 입지'||E'\n'||'합리적인 참가비', '전압 불안정', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000097', 'foodtruck', 3, 2, 3, 5, 5, '100~150만', ARRAY['20대','10대'], ARRAY['커플 / 연인'], '충분한 공간'||E'\n'||'우수한 입지', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000097', 'foodtruck', 4, 2, 2, 5, 1, '70~100만', ARRAY['20대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '충분한 공간'||E'\n'||'우수한 입지', '전압 불안정', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 4, 4, 3, 4, 5, '0~30만', ARRAY['50대 이상','40대'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'우수한 입지', '홍보 부족', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 2, 3, 4, 4, 2, '150~200만', ARRAY['10대','전 연령층'], ARRAY['커플 / 연인'], '우수한 입지'||E'\n'||'충분한 공간', '폐기물 처리 불편', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 5, 2, 4, 2, 2, '0~30만', ARRAY['20대','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 홍보'||E'\n'||'넓은 진입로', '폐기물 처리 불편', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000099', 'foodtruck', 2, 5, 4, 3, 5, '0~30만', ARRAY['40대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비', '전압 불안정', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000099', 'foodtruck', 3, 2, 4, 2, 4, '200~300만', ARRAY['50대 이상'], ARRAY['친구 / 지인'], '안정적 전력 공급', '좁은 진입로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000099', 'foodtruck', 3, 4, 3, 3, 2, '70~100만', ARRAY['20대','50대 이상'], ARRAY['친구 / 지인'], '넓은 진입로'||E'\n'||'우수한 입지', '전압 불안정', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000099', 'foodtruck', 4, 4, 3, 5, 5, '100~150만', ARRAY['30대','전 연령층'], ARRAY['관광객 / 외국인'], '충분한 공간'||E'\n'||'안정적 전력 공급', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000099', 'foodtruck', 2, 5, 3, 2, 2, '0~30만', ARRAY['10대','전 연령층'], ARRAY['커플 / 연인'], '우수한 입지'||E'\n'||'높은 집객력', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000100', 'foodtruck', 2, 5, 5, 5, 2, '100~150만', ARRAY['40대','10대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력', '폐기물 처리 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000100', 'foodtruck', 5, 5, 3, 2, 5, '70~100만', ARRAY['40대','10대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'높은 집객력', '좁은 진입로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000100', 'foodtruck', 3, 5, 3, 2, 4, '200~300만', ARRAY['10대','50대 이상'], ARRAY['관광객 / 외국인'], '충분한 공간', '폐기물 처리 불편', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '2 days');

-- ═══ 게시글 300개 ═══
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '플리마켓 디피 꿀팁 공유해요 (18)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '정주원', false, 50, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000094', '거스름돈 얼마나 준비하세요? (54)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'foodtruck', '디자이너', false, 6, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000021', '우천 시 대비 어떻게 하시나요? (1)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '유수현', false, 45, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '카드 결제 단말기 추천해주세요 (34)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '정주원', false, 25, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000076', '플리마켓에서 가장 잘 팔리는 품목은? (61)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'foodtruck', '제주살이', false, 0, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '혼자 플리마켓 참가하시는 분? (70)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'foodtruck', '소품마니아', false, 6, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '여름 야외 마켓 생존 키트 (29)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'foodtruck', '어묵바', false, 13, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000066', '셀러 보험 가입하신 분 계세요? (66)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '유시은', false, 37, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000076', '포장재 어디서 구매하시나요? (63)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'foodtruck', '제주살이', false, 31, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '마켓 끝나고 정산 어떻게 하세요? (63)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'foodtruck', '마켓러버', false, 26, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '첫 매출 100만원 달성 후기 (30)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '떡볶이천국', false, 24, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '마켓 참가 시 필요한 허가증이 있나요? (33)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'foodtruck', '한남동', false, 19, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', 'SNS 마케팅 효과 있나요? (27)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '송도현', false, 2, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '겨울 마켓 참가 고민 (41)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '안서진', false, 50, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000084', '같이 참가할 파트너 구합니다 (12)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'foodtruck', '성수감성', false, 2, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '푸드트럭 창업 비용 현실 (77)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '망원동살이', false, 22, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '마켓에서 만난 인연 (22)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '류지윤', false, 23, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '해외 플리마켓 경험 공유 (22)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '안서진', false, 42, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000065', '셀러 명함 만드셨나요? (34)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '주하린', false, 44, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '마켓 후 근육통 극복법 (46)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'foodtruck', '소품마니아', false, 25, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000048', '플리마켓 디피 꿀팁 공유해요 (87)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '민시윤', false, 4, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', '거스름돈 얼마나 준비하세요? (63)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'foodtruck', '대구마켓', false, 20, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000056', '우천 시 대비 어떻게 하시나요? (58)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '오지원', false, 10, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '카드 결제 단말기 추천해주세요 (49)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'foodtruck', '마켓러버', false, 29, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '플리마켓에서 가장 잘 팔리는 품목은? (96)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'foodtruck', '투잡러', false, 50, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', '혼자 플리마켓 참가하시는 분? (14)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'foodtruck', '대구마켓', false, 2, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '여름 야외 마켓 생존 키트 (96)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '강준서', false, 0, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '셀러 보험 가입하신 분 계세요? (82)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'foodtruck', '디자이너', false, 25, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000004', '포장재 어디서 구매하시나요? (10)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '배민서', false, 27, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '마켓 끝나고 정산 어떻게 하세요? (98)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '남서연', false, 21, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', '첫 매출 100만원 달성 후기 (54)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '임하준', false, 49, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000039', '마켓 참가 시 필요한 허가증이 있나요? (7)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '임정우', false, 38, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', 'SNS 마케팅 효과 있나요? (63)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'foodtruck', '투잡러', false, 6, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', '겨울 마켓 참가 고민 (74)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '임하준', false, 48, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '같이 참가할 파트너 구합니다 (55)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '우유준', false, 49, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '푸드트럭 창업 비용 현실 (18)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '강준서', false, 23, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000069', '마켓에서 만난 인연 (71)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '손수현', false, 50, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000022', '해외 플리마켓 경험 공유 (66)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '송지윤', false, 46, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000023', '셀러 명함 만드셨나요? (78)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '허은우', false, 27, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '마켓 후 근육통 극복법 (89)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '서소윤', false, 11, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '플리마켓 디피 꿀팁 공유해요 (17)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '이하윤', false, 38, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000051', '거스름돈 얼마나 준비하세요? (16)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '황지원', false, 46, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '우천 시 대비 어떻게 하시나요? (38)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'foodtruck', '광주플리', false, 7, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000095', '카드 결제 단말기 추천해주세요 (52)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'foodtruck', '이태원감성', false, 0, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000036', '플리마켓에서 가장 잘 팔리는 품목은? (31)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '안수아', false, 8, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '혼자 플리마켓 참가하시는 분? (67)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'foodtruck', '디자이너', false, 12, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000084', '여름 야외 마켓 생존 키트 (38)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'foodtruck', '성수감성', false, 34, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000076', '셀러 보험 가입하신 분 계세요? (12)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'foodtruck', '제주살이', false, 24, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '포장재 어디서 구매하시나요? (26)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '부업러', false, 11, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000046', '마켓 끝나고 정산 어떻게 하세요? (11)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '정시우', false, 16, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000090', '첫 매출 100만원 달성 후기 (81)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'foodtruck', '버거킹트럭', false, 11, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '마켓 참가 시 필요한 허가증이 있나요? (52)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '장서진', false, 1, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000026', 'SNS 마케팅 효과 있나요? (6)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '강연우', false, 41, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '겨울 마켓 참가 고민 (92)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '정지호', false, 38, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '같이 참가할 파트너 구합니다 (7)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '정주원', false, 2, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000079', '푸드트럭 창업 비용 현실 (78)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'foodtruck', '수원마켓', false, 38, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', '마켓에서 만난 인연 (84)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '임하준', false, 49, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '해외 플리마켓 경험 공유 (5)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '안서진', false, 6, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '셀러 명함 만드셨나요? (91)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '노예준', false, 25, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000051', '마켓 후 근육통 극복법 (99)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '황지원', false, 49, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000096', '플리마켓 디피 꿀팁 공유해요 (93)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'foodtruck', '크레페트럭', false, 7, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000049', '거스름돈 얼마나 준비하세요? (32)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '장하린', false, 17, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '우천 시 대비 어떻게 하시나요? (28)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '백준서', false, 26, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000100', '카드 결제 단말기 추천해주세요 (23)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'foodtruck', '마켓고수', false, 20, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000048', '플리마켓에서 가장 잘 팔리는 품목은? (85)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '민시윤', false, 15, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '혼자 플리마켓 참가하시는 분? (8)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '손소윤', false, 30, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '여름 야외 마켓 생존 키트 (96)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'foodtruck', '일러스트작가', false, 7, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '셀러 보험 가입하신 분 계세요? (48)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '떡볶이천국', false, 27, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000008', '포장재 어디서 구매하시나요? (68)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '황시우', false, 40, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000066', '마켓 끝나고 정산 어떻게 하세요? (79)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '유시은', false, 27, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000049', '첫 매출 100만원 달성 후기 (41)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '장하린', false, 4, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000047', '마켓 참가 시 필요한 허가증이 있나요? (60)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '한현서', false, 30, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', 'SNS 마케팅 효과 있나요? (51)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '남서연', false, 39, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '겨울 마켓 참가 고민 (74)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '안서진', false, 4, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '같이 참가할 파트너 구합니다 (45)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '정지호', false, 0, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000003', '푸드트럭 창업 비용 현실 (96)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '윤지훈', false, 28, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000039', '마켓에서 만난 인연 (81)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '임정우', false, 32, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000079', '해외 플리마켓 경험 공유 (96)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'foodtruck', '수원마켓', false, 24, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '셀러 명함 만드셨나요? (6)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '망원동살이', false, 47, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '마켓 후 근육통 극복법 (74)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '망원동살이', false, 40, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '플리마켓 디피 꿀팁 공유해요 (7)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '주윤서', false, 47, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000084', '거스름돈 얼마나 준비하세요? (95)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'foodtruck', '성수감성', false, 45, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000010', '우천 시 대비 어떻게 하시나요? (78)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '한유진', false, 23, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '카드 결제 단말기 추천해주세요 (83)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '백준서', false, 8, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '플리마켓에서 가장 잘 팔리는 품목은? (30)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'foodtruck', '작가생활', false, 17, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000025', '혼자 플리마켓 참가하시는 분? (13)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '민승우', false, 17, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '여름 야외 마켓 생존 키트 (76)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '전유준', false, 31, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '셀러 보험 가입하신 분 계세요? (57)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '남채원', false, 5, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '포장재 어디서 구매하시나요? (29)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '우유준', false, 16, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '마켓 끝나고 정산 어떻게 하세요? (24)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '류지윤', false, 28, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000071', '첫 매출 100만원 달성 후기 (33)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '스무디트럭', false, 28, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '마켓 참가 시 필요한 허가증이 있나요? (24)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '떡볶이천국', false, 20, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', 'SNS 마케팅 효과 있나요? (13)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'foodtruck', '부산셀러', false, 22, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '겨울 마켓 참가 고민 (46)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'foodtruck', '투잡러', false, 19, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000003', '같이 참가할 파트너 구합니다 (51)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '윤지훈', false, 19, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '푸드트럭 창업 비용 현실 (2)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '백준서', false, 41, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000003', '마켓에서 만난 인연 (16)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '윤지훈', false, 15, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '해외 플리마켓 경험 공유 (15)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'foodtruck', '마켓러버', false, 13, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000043', '셀러 명함 만드셨나요? (94)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '홍우진', false, 35, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '마켓 후 근육통 극복법 (26)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'foodtruck', '어묵바', false, 2, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000043', '플리마켓 디피 꿀팁 공유해요 (81)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '홍우진', false, 32, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '거스름돈 얼마나 준비하세요? (38)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '노예준', false, 39, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000062', '우천 시 대비 어떻게 하시나요? (12)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '박예은', false, 12, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000078', '카드 결제 단말기 추천해주세요 (80)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'foodtruck', '망원동살이', false, 12, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000081', '플리마켓에서 가장 잘 팔리는 품목은? (40)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'foodtruck', '캔들메이커', false, 0, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '혼자 플리마켓 참가하시는 분? (65)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '배승현', false, 42, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000033', '여름 야외 마켓 생존 키트 (67)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '윤서윤', false, 41, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '셀러 보험 가입하신 분 계세요? (83)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'foodtruck', '한남동', false, 6, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000051', '포장재 어디서 구매하시나요? (15)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '황지원', false, 40, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '마켓 끝나고 정산 어떻게 하세요? (49)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '손소윤', false, 15, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000079', '첫 매출 100만원 달성 후기 (75)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'foodtruck', '수원마켓', false, 10, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000041', '마켓 참가 시 필요한 허가증이 있나요? (61)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '주시윤', false, 22, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', 'SNS 마케팅 효과 있나요? (27)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '임하준', false, 23, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000064', '겨울 마켓 참가 고민 (77)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '허유준', false, 41, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '같이 참가할 파트너 구합니다 (37)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '손소윤', false, 47, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '푸드트럭 창업 비용 현실 (40)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '강준서', false, 8, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000009', '마켓에서 만난 인연 (10)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '곽서진', false, 43, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '해외 플리마켓 경험 공유 (52)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '떡볶이천국', false, 50, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '셀러 명함 만드셨나요? (67)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '정주원', false, 24, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000061', '마켓 후 근육통 극복법 (92)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '류윤서', false, 41, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '플리마켓 디피 꿀팁 공유해요 (5)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '노서윤', false, 29, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000053', '거스름돈 얼마나 준비하세요? (32)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '박수아', false, 50, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '우천 시 대비 어떻게 하시나요? (97)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'foodtruck', '마켓러버', false, 39, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '카드 결제 단말기 추천해주세요 (34)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '장서진', false, 15, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000057', '플리마켓에서 가장 잘 팔리는 품목은? (76)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '류지윤', false, 29, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000093', '혼자 플리마켓 참가하시는 분? (32)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'foodtruck', '빈티지수집가', false, 20, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '여름 야외 마켓 생존 키트 (19)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '장서진', false, 18, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '셀러 보험 가입하신 분 계세요? (51)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '부업러', false, 41, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '포장재 어디서 구매하시나요? (35)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '강준서', false, 5, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000028', '마켓 끝나고 정산 어떻게 하세요? (75)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '홍소윤', false, 30, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000080', '첫 매출 100만원 달성 후기 (84)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'foodtruck', '감성셀러', false, 39, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '마켓 참가 시 필요한 허가증이 있나요? (73)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'foodtruck', '투잡러', false, 36, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', 'SNS 마케팅 효과 있나요? (79)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'foodtruck', '성수감성', false, 7, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000034', '겨울 마켓 참가 고민 (14)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '유서연', false, 33, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000022', '같이 참가할 파트너 구합니다 (81)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '송지윤', false, 31, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '푸드트럭 창업 비용 현실 (8)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '송도현', false, 17, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000096', '마켓에서 만난 인연 (75)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'foodtruck', '크레페트럭', false, 14, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '해외 플리마켓 경험 공유 (84)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '배승현', false, 30, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000009', '셀러 명함 만드셨나요? (4)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '곽서진', false, 19, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000062', '마켓 후 근육통 극복법 (79)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '박예은', false, 29, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000049', '플리마켓 디피 꿀팁 공유해요 (62)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '장하린', false, 31, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '거스름돈 얼마나 준비하세요? (99)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '떡볶이천국', false, 45, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '우천 시 대비 어떻게 하시나요? (65)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '정지호', false, 20, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '카드 결제 단말기 추천해주세요 (81)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '하소율', false, 17, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '플리마켓에서 가장 잘 팔리는 품목은? (88)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '안서진', false, 41, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '혼자 플리마켓 참가하시는 분? (38)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '노서윤', false, 5, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000065', '여름 야외 마켓 생존 키트 (89)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '주하린', false, 22, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '셀러 보험 가입하신 분 계세요? (37)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '안서진', false, 45, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '포장재 어디서 구매하시나요? (97)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '부업러', false, 28, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000073', '마켓 끝나고 정산 어떻게 하세요? (7)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '타코트럭', false, 22, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '솔직히 플리마켓 수익 별로 아닌가요? (7)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 49, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000062', '주최사 갑질 경험 있으신 분? (72)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 47, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000023', '같은 행사 셀러끼리 경쟁이 심해요 (60)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 11, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000018', '참가비 환불 안 해주는 주최사 (34)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 4, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '야시장에서 도난 당했어요 (80)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'foodtruck', null, true, 32, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000069', '솔직히 플리마켓 수익 별로 아닌가요? (99)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 21, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '주최사 갑질 경험 있으신 분? (61)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 46, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000046', '같은 행사 셀러끼리 경쟁이 심해요 (58)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 7, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '참가비 환불 안 해주는 주최사 (47)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 47, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '야시장에서 도난 당했어요 (32)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 27, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '솔직히 플리마켓 수익 별로 아닌가요? (27)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 25, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000004', '주최사 갑질 경험 있으신 분? (2)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 26, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000100', '같은 행사 셀러끼리 경쟁이 심해요 (94)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 6, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000071', '참가비 환불 안 해주는 주최사 (36)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 23, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000059', '야시장에서 도난 당했어요 (73)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 4, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '솔직히 플리마켓 수익 별로 아닌가요? (4)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 31, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '주최사 갑질 경험 있으신 분? (54)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 21, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '같은 행사 셀러끼리 경쟁이 심해요 (25)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 12, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '참가비 환불 안 해주는 주최사 (23)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 44, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '야시장에서 도난 당했어요 (12)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 50, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '솔직히 플리마켓 수익 별로 아닌가요? (67)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 32, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', '주최사 갑질 경험 있으신 분? (64)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'foodtruck', null, true, 46, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '같은 행사 셀러끼리 경쟁이 심해요 (59)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 13, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '참가비 환불 안 해주는 주최사 (93)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 0, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000071', '야시장에서 도난 당했어요 (38)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 27, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000010', '솔직히 플리마켓 수익 별로 아닌가요? (52)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 24, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '주최사 갑질 경험 있으신 분? (3)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'foodtruck', null, true, 25, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '같은 행사 셀러끼리 경쟁이 심해요 (34)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 19, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '참가비 환불 안 해주는 주최사 (97)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 28, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '야시장에서 도난 당했어요 (99)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 13, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '솔직히 플리마켓 수익 별로 아닌가요? (6)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 32, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '주최사 갑질 경험 있으신 분? (94)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 10, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000041', '같은 행사 셀러끼리 경쟁이 심해요 (62)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 30, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '참가비 환불 안 해주는 주최사 (99)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 38, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '야시장에서 도난 당했어요 (72)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 26, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000079', '솔직히 플리마켓 수익 별로 아닌가요? (58)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 0, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000030', '주최사 갑질 경험 있으신 분? (59)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 14, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '같은 행사 셀러끼리 경쟁이 심해요 (13)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 28, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000040', '참가비 환불 안 해주는 주최사 (11)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 50, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '야시장에서 도난 당했어요 (51)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 11, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000040', '솔직히 플리마켓 수익 별로 아닌가요? (90)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 8, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '주최사 갑질 경험 있으신 분? (98)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 9, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '같은 행사 셀러끼리 경쟁이 심해요 (72)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 3, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000035', '참가비 환불 안 해주는 주최사 (20)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 46, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '야시장에서 도난 당했어요 (24)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 13, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '솔직히 플리마켓 수익 별로 아닌가요? (83)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 37, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000048', '주최사 갑질 경험 있으신 분? (32)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 31, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000090', '같은 행사 셀러끼리 경쟁이 심해요 (31)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 31, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000042', '참가비 환불 안 해주는 주최사 (16)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 34, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000040', '야시장에서 도난 당했어요 (89)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 38, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '솔직히 플리마켓 수익 별로 아닌가요? (64)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 17, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000037', '주최사 갑질 경험 있으신 분? (50)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 29, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '같은 행사 셀러끼리 경쟁이 심해요 (25)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 28, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '참가비 환불 안 해주는 주최사 (4)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 14, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '야시장에서 도난 당했어요 (37)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 38, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000084', '솔직히 플리마켓 수익 별로 아닌가요? (33)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 19, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000094', '주최사 갑질 경험 있으신 분? (68)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'foodtruck', null, true, 15, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000003', '같은 행사 셀러끼리 경쟁이 심해요 (15)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 41, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '참가비 환불 안 해주는 주최사 (81)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'foodtruck', null, true, 8, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000022', '야시장에서 도난 당했어요 (16)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 37, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000071', '[현장] 여의도 야시장 현재 상황 (76)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '스무디트럭', false, 5, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000043', '[현장] 홍대 프리마켓 오늘 날씨 최고 (66)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '홍우진', false, 43, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000069', '[현장] 성수 플리마켓 오픈 직후 (43)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '손수현', false, 28, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000034', '[현장] 해운대 선셋마켓 석양 미쳤다 (6)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '유서연', false, 18, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000100', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (14)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '마켓고수', false, 1, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000093', '[현장] 여의도 야시장 현재 상황 (62)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'foodtruck', '빈티지수집가', false, 37, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '[현장] 홍대 프리마켓 오늘 날씨 최고 (43)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '부업러', false, 3, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '[현장] 성수 플리마켓 오픈 직후 (77)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'foodtruck', '투잡러', false, 0, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000030', '[현장] 해운대 선셋마켓 석양 미쳤다 (70)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '주민준', false, 39, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000037', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (83)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '주하린', false, 11, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000064', '[현장] 여의도 야시장 현재 상황 (86)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '허유준', false, 31, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000028', '[현장] 홍대 프리마켓 오늘 날씨 최고 (60)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '홍소윤', false, 48, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '[현장] 성수 플리마켓 오픈 직후 (85)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'foodtruck', '마켓러버', false, 7, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '[현장] 해운대 선셋마켓 석양 미쳤다 (57)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '남채원', false, 11, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (51)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '남서연', false, 5, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '[현장] 여의도 야시장 현재 상황 (68)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '이하윤', false, 17, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '[현장] 홍대 프리마켓 오늘 날씨 최고 (14)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'foodtruck', '작가생활', false, 41, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '[현장] 성수 플리마켓 오픈 직후 (4)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '서소윤', false, 33, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '[현장] 해운대 선셋마켓 석양 미쳤다 (9)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '노서윤', false, 7, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (7)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '정주원', false, 1, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000008', '[현장] 여의도 야시장 현재 상황 (88)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '황시우', false, 13, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', '[현장] 홍대 프리마켓 오늘 날씨 최고 (72)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'foodtruck', '부산셀러', false, 10, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', '[현장] 성수 플리마켓 오픈 직후 (3)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '손재윤', false, 5, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '[현장] 해운대 선셋마켓 석양 미쳤다 (6)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '부업러', false, 24, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000053', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (94)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '박수아', false, 19, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '[현장] 여의도 야시장 현재 상황 (67)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '하소율', false, 7, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000076', '[현장] 홍대 프리마켓 오늘 날씨 최고 (89)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'foodtruck', '제주살이', false, 45, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', '[현장] 성수 플리마켓 오픈 직후 (48)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'foodtruck', '부산셀러', false, 50, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '[현장] 해운대 선셋마켓 석양 미쳤다 (90)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '하소율', false, 49, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000036', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (55)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '안수아', false, 49, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000009', '[현장] 여의도 야시장 현재 상황 (24)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '곽서진', false, 36, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '[현장] 홍대 프리마켓 오늘 날씨 최고 (24)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '강준서', false, 8, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000057', '[현장] 성수 플리마켓 오픈 직후 (43)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '류지윤', false, 40, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000078', '[현장] 해운대 선셋마켓 석양 미쳤다 (17)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'foodtruck', '망원동살이', false, 35, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (90)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '성수감성', false, 17, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '[현장] 여의도 야시장 현재 상황 (24)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '백준서', false, 6, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '[현장] 홍대 프리마켓 오늘 날씨 최고 (80)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '남서연', false, 11, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', '[현장] 성수 플리마켓 오픈 직후 (11)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'foodtruck', '대구마켓', false, 9, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '[현장] 해운대 선셋마켓 석양 미쳤다 (30)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'foodtruck', '광주플리', false, 10, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (36)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '곽다은', false, 38, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000028', '[현장] 여의도 야시장 현재 상황 (14)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '홍소윤', false, 33, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', '[현장] 홍대 프리마켓 오늘 날씨 최고 (61)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'foodtruck', '부산셀러', false, 7, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000053', '[현장] 성수 플리마켓 오픈 직후 (79)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '박수아', false, 15, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '[현장] 해운대 선셋마켓 석양 미쳤다 (48)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'foodtruck', '소품마니아', false, 35, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000095', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (66)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '이태원감성', false, 13, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '[양도] 4/12 홍대 프리마켓 자리 (3)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '전유준', false, 27, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '[양수] 여의도 야시장 자리 구합니다 (54)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '배승현', false, 11, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000023', '[양도] 4/19 성수 플리마켓 2자리 양도 (44)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '허은우', false, 30, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000033', '[양수] 제주 핸드메이드 페어 자리 (98)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '윤서윤', false, 16, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '[양도] 4/19 인천 송도 마켓 양도 (59)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '정주원', false, 35, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '[양도] 4/12 홍대 프리마켓 자리 (16)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '전유준', false, 38, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000066', '[양수] 여의도 야시장 자리 구합니다 (9)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '유시은', false, 34, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000069', '[양도] 4/19 성수 플리마켓 2자리 양도 (69)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '손수현', false, 47, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '[양수] 제주 핸드메이드 페어 자리 (26)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '망원동살이', false, 20, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000035', '[양도] 4/19 인천 송도 마켓 양도 (5)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '홍연우', false, 0, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000030', '[양도] 4/12 홍대 프리마켓 자리 (48)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '주민준', false, 43, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '[양수] 여의도 야시장 자리 구합니다 (9)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '정지호', false, 10, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000041', '[양도] 4/19 성수 플리마켓 2자리 양도 (99)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '주시윤', false, 12, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000057', '[양수] 제주 핸드메이드 페어 자리 (93)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '류지윤', false, 44, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000036', '[양도] 4/19 인천 송도 마켓 양도 (21)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '안수아', false, 31, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000047', '[양도] 4/12 홍대 프리마켓 자리 (84)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '한현서', false, 25, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '[양수] 여의도 야시장 자리 구합니다 (44)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'foodtruck', '어묵바', false, 36, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '[양도] 4/19 성수 플리마켓 2자리 양도 (33)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '남서연', false, 0, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '[양수] 제주 핸드메이드 페어 자리 (75)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '이하윤', false, 48, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000056', '[양도] 4/19 인천 송도 마켓 양도 (74)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '오지원', false, 47, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '[양도] 4/12 홍대 프리마켓 자리 (15)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '하하은', false, 6, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '[양수] 여의도 야시장 자리 구합니다 (25)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '노서윤', false, 21, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000094', '[양도] 4/19 성수 플리마켓 2자리 양도 (14)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'foodtruck', '디자이너', false, 49, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000039', '[양수] 제주 핸드메이드 페어 자리 (65)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '임정우', false, 32, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '[양도] 4/19 인천 송도 마켓 양도 (71)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '부업러', false, 15, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000043', '[양도] 4/12 홍대 프리마켓 자리 (3)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '홍우진', false, 49, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '[양수] 여의도 야시장 자리 구합니다 (52)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '송도현', false, 1, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000036', '[양도] 4/19 성수 플리마켓 2자리 양도 (69)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '안수아', false, 35, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '[양수] 제주 핸드메이드 페어 자리 (99)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '정주원', false, 16, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '[양도] 4/19 인천 송도 마켓 양도 (4)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '백준서', false, 29, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '[양도] 4/12 홍대 프리마켓 자리 (29)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '백준서', false, 38, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '[양수] 여의도 야시장 자리 구합니다 (1)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '안서진', false, 10, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '[양도] 4/19 성수 플리마켓 2자리 양도 (67)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '송도현', false, 6, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000045', '[양수] 제주 핸드메이드 페어 자리 (99)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '서서연', false, 18, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000042', '[양도] 4/19 인천 송도 마켓 양도 (13)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '정주원', false, 17, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000057', '[양도] 4/12 홍대 프리마켓 자리 (17)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '류지윤', false, 24, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '[양수] 여의도 야시장 자리 구합니다 (22)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'foodtruck', '디자이너', false, 15, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '[양도] 4/19 성수 플리마켓 2자리 양도 (56)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '배승현', false, 18, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '[양수] 제주 핸드메이드 페어 자리 (18)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '남서연', false, 27, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000073', '[양도] 4/19 인천 송도 마켓 양도 (32)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '타코트럭', false, 18, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '[양도] 4/12 홍대 프리마켓 자리 (86)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '곽다은', false, 22, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000047', '[양수] 여의도 야시장 자리 구합니다 (1)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '한현서', false, 23, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000021', '[양도] 4/19 성수 플리마켓 2자리 양도 (97)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '유수현', false, 8, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '[양수] 제주 핸드메이드 페어 자리 (47)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '곽다은', false, 38, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000042', '[양도] 4/19 인천 송도 마켓 양도 (44)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '정주원', false, 2, NOW() - interval '1 days');

-- ═══ 통계 업데이트 ═══
UPDATE public.event_instances ei SET
    review_count = sub.cnt,
    avg_event_rating = sub.avg_rating
FROM (
    SELECT event_instance_id,
        COUNT(*) as cnt,
        AVG((COALESCE(rating_profit,0) + COALESCE(rating_traffic,0) + COALESCE(rating_support,0) + COALESCE(rating_manners,0)) / 4.0) as avg_rating
    FROM public.reviews GROUP BY event_instance_id
) sub WHERE ei.id = sub.event_instance_id;

UPDATE public.base_events be SET
    total_reviews = sub.cnt,
    avg_event_rating = sub.avg_rating
FROM (
    SELECT ei.base_event_id, COUNT(r.*) as cnt,
        AVG((COALESCE(r.rating_profit,0) + COALESCE(r.rating_traffic,0) + COALESCE(r.rating_support,0) + COALESCE(r.rating_manners,0)) / 4.0) as avg_rating
    FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id
    GROUP BY ei.base_event_id
) sub WHERE be.id = sub.base_event_id;

UPDATE public.organizers o SET
    total_reviews = sub.cnt
FROM (
    SELECT ei.organizer_id, COUNT(r.*) as cnt
    FROM public.reviews r JOIN public.event_instances ei ON ei.id = r.event_instance_id
    WHERE ei.organizer_id IS NOT NULL GROUP BY ei.organizer_id
) sub WHERE o.id = sub.organizer_id;
