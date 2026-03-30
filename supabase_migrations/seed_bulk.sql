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
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user1_967@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"백하윤","name":"백하윤"}', NOW() - interval '30 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user2_255@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"김서현","name":"김서현"}', NOW() - interval '43 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user3_918@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"우재윤","name":"우재윤"}', NOW() - interval '50 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user4_566@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정연우","name":"정연우"}', NOW() - interval '19 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user5_412@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"황유진","name":"황유진"}', NOW() - interval '27 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user6_448@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"조승현","name":"조승현"}', NOW() - interval '47 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user7_849@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"손은서","name":"손은서"}', NOW() - interval '58 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user8_644@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한건우","name":"한건우"}', NOW() - interval '21 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user9_812@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"고시윤","name":"고시윤"}', NOW() - interval '36 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user10_178@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"남건우","name":"남건우"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user11_557@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"성건우","name":"성건우"}', NOW() - interval '36 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user12_443@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"조민서","name":"조민서"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user13_168@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"황연우","name":"황연우"}', NOW() - interval '30 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user14_856@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"황하준","name":"황하준"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user15_660@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"송도현","name":"송도현"}', NOW() - interval '4 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user16_539@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"김연우","name":"김연우"}', NOW() - interval '44 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user17_425@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"류하윤","name":"류하윤"}', NOW() - interval '37 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user18_121@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"배서현","name":"배서현"}', NOW() - interval '14 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user19_230@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"양연우","name":"양연우"}', NOW() - interval '41 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user20_296@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"류승현","name":"류승현"}', NOW() - interval '56 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user21_830@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"노소윤","name":"노소윤"}', NOW() - interval '60 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user22_673@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"남태윤","name":"남태윤"}', NOW() - interval '55 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user23_606@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"양다은","name":"양다은"}', NOW() - interval '37 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user24_124@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이서연","name":"이서연"}', NOW() - interval '44 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user25_221@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"문승우","name":"문승우"}', NOW() - interval '40 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user26_857@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"주민서","name":"주민서"}', NOW() - interval '38 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user27_367@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"임지안","name":"임지안"}', NOW() - interval '35 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user28_750@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"배은우","name":"배은우"}', NOW() - interval '21 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user29_190@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"김시은","name":"김시은"}', NOW() - interval '27 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user30_111@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"홍하준","name":"홍하준"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user31_783@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"장지호","name":"장지호"}', NOW() - interval '12 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user32_629@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"강승우","name":"강승우"}', NOW() - interval '41 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user33_975@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"양서연","name":"양서연"}', NOW() - interval '37 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user34_498@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"남서연","name":"남서연"}', NOW() - interval '57 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user35_416@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"허소율","name":"허소율"}', NOW() - interval '50 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user36_851@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"황서윤","name":"황서윤"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user37_533@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"성지우","name":"성지우"}', NOW() - interval '41 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user38_204@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"나승현","name":"나승현"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user39_120@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"조도윤","name":"조도윤"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user40_655@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이아린","name":"이아린"}', NOW() - interval '23 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user41_269@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"나승현","name":"나승현"}', NOW() - interval '50 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user42_487@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"조윤서","name":"조윤서"}', NOW() - interval '15 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user43_458@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"송재윤","name":"송재윤"}', NOW() - interval '1 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user44_149@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"곽은서","name":"곽은서"}', NOW() - interval '1 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user45_464@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"장예준","name":"장예준"}', NOW() - interval '55 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user46_306@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"우서윤","name":"우서윤"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user47_219@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"신소율","name":"신소율"}', NOW() - interval '4 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user48_583@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"서서진","name":"서서진"}', NOW() - interval '2 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user49_754@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유유준","name":"유유준"}', NOW() - interval '26 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user50_847@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이도윤","name":"이도윤"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user51_848@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유서연","name":"유서연"}', NOW() - interval '45 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user52_311@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"오은우","name":"오은우"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user53_174@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정현우","name":"정현우"}', NOW() - interval '4 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user54_553@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"윤서연","name":"윤서연"}', NOW() - interval '44 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user55_769@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"우민준","name":"우민준"}', NOW() - interval '3 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user56_101@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"유수빈","name":"유수빈"}', NOW() - interval '45 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user57_228@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"허건우","name":"허건우"}', NOW() - interval '40 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user58_186@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"하지윤","name":"하지윤"}', NOW() - interval '8 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user59_612@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"오하윤","name":"오하윤"}', NOW() - interval '53 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user60_761@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"성서현","name":"성서현"}', NOW() - interval '25 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user61_880@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"정지안","name":"정지안"}', NOW() - interval '22 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user62_436@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"민하윤","name":"민하윤"}', NOW() - interval '59 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user63_994@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"하서현","name":"하서현"}', NOW() - interval '60 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000064', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user64_209@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"양승우","name":"양승우"}', NOW() - interval '19 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000065', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user65_548@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한아린","name":"한아린"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000066', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user66_378@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"오수아","name":"오수아"}', NOW() - interval '51 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000067', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user67_545@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"나다은","name":"나다은"}', NOW() - interval '2 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000068', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user68_264@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"양건우","name":"양건우"}', NOW() - interval '13 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000069', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user69_901@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"오지호","name":"오지호"}', NOW() - interval '35 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000070', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user70_187@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"임정우","name":"임정우"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000071', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user71_947@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한남동","name":"한남동"}', NOW() - interval '42 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000072', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user72_774@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"망원동살이","name":"망원동살이"}', NOW() - interval '13 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000073', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user73_460@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"스무디트럭","name":"스무디트럭"}', NOW() - interval '32 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000074', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user74_252@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"마켓러버","name":"마켓러버"}', NOW() - interval '30 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000075', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user75_767@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"홍대라이프","name":"홍대라이프"}', NOW() - interval '14 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000076', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user76_464@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"스무디트럭","name":"스무디트럭"}', NOW() - interval '49 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000077', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user77_163@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"떡볶이천국","name":"떡볶이천국"}', NOW() - interval '5 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000078', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user78_865@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"파스타트럭","name":"파스타트럭"}', NOW() - interval '38 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000079', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user79_360@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한남동","name":"한남동"}', NOW() - interval '42 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user80_930@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이태원감성","name":"이태원감성"}', NOW() - interval '48 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000081', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user81_309@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"치킨트럭","name":"치킨트럭"}', NOW() - interval '29 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000082', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user82_378@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한남동","name":"한남동"}', NOW() - interval '21 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user83_951@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"파스타트럭","name":"파스타트럭"}', NOW() - interval '23 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000084', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user84_625@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"마켓러버","name":"마켓러버"}', NOW() - interval '44 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000085', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user85_538@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"디자이너","name":"디자이너"}', NOW() - interval '16 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000086', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user86_762@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"인천마켓","name":"인천마켓"}', NOW() - interval '34 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000087', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user87_518@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"일상공유","name":"일상공유"}', NOW() - interval '39 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000088', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user88_455@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"성수감성","name":"성수감성"}', NOW() - interval '14 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000089', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user89_627@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"일상공유","name":"일상공유"}', NOW() - interval '46 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000090', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user90_399@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"대구마켓","name":"대구마켓"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000091', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user91_474@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"플리초보","name":"플리초보"}', NOW() - interval '12 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000092', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user92_327@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"한남동","name":"한남동"}', NOW() - interval '55 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000093', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user93_422@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"홍대라이프","name":"홍대라이프"}', NOW() - interval '52 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000094', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user94_398@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"이태원감성","name":"이태원감성"}', NOW() - interval '3 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000095', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user95_238@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"파스타트럭","name":"파스타트럭"}', NOW() - interval '40 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000096', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user96_240@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"취미생활","name":"취미생활"}', NOW() - interval '22 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000097', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user97_689@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"제주살이","name":"제주살이"}', NOW() - interval '22 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000098', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user98_283@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"부산셀러","name":"부산셀러"}', NOW() - interval '9 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000099', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user99_626@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"와플장인","name":"와플장인"}', NOW() - interval '6 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token) VALUES ('f1000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'user100_878@test.com', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234', NOW(), '{"full_name":"와플장인","name":"와플장인"}', NOW() - interval '57 days', NOW(), '', '') ON CONFLICT (id) DO NOTHING;

-- profiles 업데이트
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000001';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000002';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000003';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000004';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000005';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000006';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000007';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000008';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000009';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000010';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000011';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000012';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000013';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000014';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000015';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000016';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000017';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000018';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000019';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000020';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000021';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000022';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000023';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000024';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000025';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000026';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000027';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000028';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000029';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000030';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000031';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000032';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000033';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000034';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000035';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000036';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000037';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000038';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000039';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000040';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000041';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000042';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000043';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000044';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000045';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000046';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000047';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000048';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000049';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000050';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000051';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000052';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000053';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000054';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000055';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000056';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000057';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000058';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000059';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000060';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000061';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000062';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000063';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000064';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000065';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000066';
UPDATE public.profiles SET seller_type = 'seller', review_count = 2, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000067';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000068';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000069';
UPDATE public.profiles SET seller_type = 'seller', review_count = 5, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000070';
UPDATE public.profiles SET seller_type = 'seller', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000071';
UPDATE public.profiles SET seller_type = 'seller', review_count = 3, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000072';
UPDATE public.profiles SET seller_type = 'seller', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000073';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000074';
UPDATE public.profiles SET seller_type = 'seller', review_count = 4, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000075';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000076';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000077';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000078';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000079';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000080';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000081';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '2 days' WHERE id = 'f1000000-0000-0000-0000-000000000082';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000083';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000084';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000085';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 2, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000086';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '7 days' WHERE id = 'f1000000-0000-0000-0000-000000000087';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 5, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000088';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '3 days' WHERE id = 'f1000000-0000-0000-0000-000000000089';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '1 days' WHERE id = 'f1000000-0000-0000-0000-000000000090';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000091';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 3, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000092';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000093';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '4 days' WHERE id = 'f1000000-0000-0000-0000-000000000094';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000095';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000096';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '5 days' WHERE id = 'f1000000-0000-0000-0000-000000000097';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 4, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000098';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 0 WHERE id = 'f1000000-0000-0000-0000-000000000099';
UPDATE public.profiles SET seller_type = 'foodtruck', review_count = 1, last_review_at = NOW() - interval '6 days' WHERE id = 'f1000000-0000-0000-0000-000000000100';

-- ═══ 추가 리뷰 ═══
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', 'seller', 2, 3, 2, 4, 4, '60~80만', ARRAY['50대 이상','30대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'높은 구매력', '좁은 부스 공간', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000001', 'seller', 2, 4, 4, 5, 5, '60~80만', ARRAY['30대','10대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 집객력', '그늘 없음', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000001', 'seller', 4, 3, 5, 3, 3, '40~60만', ARRAY['전 연령층','30대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000002', 'seller', 3, 2, 5, 4, 4, '80~100만', ARRAY['20대'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000002', 'seller', 4, 3, 4, 3, 2, '60~80만', ARRAY['20대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '높은 구매력'||E'\n'||'높은 집객력', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000002', 'seller', 2, 3, 5, 2, 2, '40~60만', ARRAY['30대','10대'], ARRAY['커플 / 연인'], '넓은 부스 공간', '비싼 부스비', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000003', 'seller', 5, 3, 5, 4, 4, '40~60만', ARRAY['30대','40대'], ARRAY['관광객 / 외국인'], '높은 집객력', '좁은 부스 공간', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000003', 'seller', 5, 5, 2, 4, 4, '100~150만', ARRAY['전 연령층','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'넓은 부스 공간', '비싼 부스비', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000003', 'seller', 5, 5, 2, 5, 1, '80~100만', ARRAY['10대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'합리적인 참가비', '그늘 없음', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000003', 'seller', 2, 5, 4, 5, 4, '60~80만', ARRAY['50대 이상','20대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'체계적인 행사 운영', '그늘 없음', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000003', 'seller', 2, 5, 3, 2, 5, '40~60만', ARRAY['30대','40대'], ARRAY['커플 / 연인'], '합리적인 참가비', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000004', 'seller', 4, 4, 2, 4, 4, '80~100만', ARRAY['전 연령층','20대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'적극적인 SNS 홍보', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000004', 'seller', 3, 4, 2, 5, 3, '0~20만', ARRAY['40대'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진'||E'\n'||'합리적인 참가비', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000005', 'seller', 4, 2, 5, 2, 4, '0~20만', ARRAY['20대','30대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'높은 구매력', '비싼 부스비', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000005', 'seller', 5, 2, 2, 2, 3, '0~20만', ARRAY['50대 이상','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'좋은 접근성', '비싼 부스비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000005', 'seller', 5, 5, 3, 5, 3, '20~40만', ARRAY['10대','30대'], ARRAY['관광객 / 외국인'], '친절한 운영진'||E'\n'||'좋은 접근성', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000005', 'seller', 5, 5, 3, 2, 1, '60~80만', ARRAY['전 연령층','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성'||E'\n'||'합리적인 참가비', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000006', 'seller', 4, 3, 5, 2, 1, '80~100만', ARRAY['30대','20대'], ARRAY['나홀로 방문객 (혼쇼족)'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '좁은 통로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000006', 'seller', 4, 3, 4, 5, 4, '40~60만', ARRAY['20대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '비싼 부스비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000006', 'seller', 5, 4, 5, 2, 2, '0~20만', ARRAY['30대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000006', 'seller', 5, 4, 2, 4, 2, '40~60만', ARRAY['40대','20대'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000008', 'seller', 5, 5, 5, 3, 4, '80~100만', ARRAY['50대 이상','20대'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000008', 'seller', 2, 5, 4, 2, 4, '80~100만', ARRAY['10대','40대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'높은 집객력', '주차 불편', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000008', 'seller', 2, 2, 2, 4, 3, '100~150만', ARRAY['20대','50대 이상'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '주차 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000009', 'seller', 5, 2, 3, 3, 3, '100~150만', ARRAY['40대','10대'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000009', 'seller', 2, 5, 3, 3, 2, '0~20만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '주최사 소통 부재', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000009', 'seller', 2, 3, 5, 3, 4, '40~60만', ARRAY['20대'], ARRAY['커플 / 연인'], '좋은 접근성', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000009', 'seller', 5, 2, 3, 2, 5, '40~60만', ARRAY['20대','10대'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000009', 'seller', 4, 4, 2, 3, 1, '60~80만', ARRAY['50대 이상','20대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '좁은 통로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000010', 'seller', 2, 4, 4, 4, 5, '60~80만', ARRAY['50대 이상','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000010', 'seller', 4, 4, 4, 2, 1, '100~150만', ARRAY['전 연령층','10대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000010', 'seller', 5, 4, 5, 3, 3, '60~80만', ARRAY['40대'], ARRAY['커플 / 연인'], '높은 구매력', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000011', 'seller', 5, 3, 3, 2, 5, '40~60만', ARRAY['50대 이상'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'친절한 운영진', '좁은 부스 공간', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000012', 'seller', 3, 5, 3, 2, 5, '60~80만', ARRAY['30대','20대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'넓은 부스 공간', '주차 불편', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000012', 'seller', 3, 5, 3, 2, 1, '60~80만', ARRAY['50대 이상','30대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'친절한 운영진', '주최사 소통 부재', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000012', 'seller', 2, 2, 4, 3, 1, '60~80만', ARRAY['40대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진', '좁은 부스 공간', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '4 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000012', 'seller', 5, 2, 5, 4, 5, '60~80만', ARRAY['50대 이상','40대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보', '운영 미흡', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000012', 'seller', 4, 4, 3, 2, 2, '80~100만', ARRAY['전 연령층','20대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000013', 'seller', 2, 5, 2, 2, 4, '60~80만', ARRAY['50대 이상','30대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'적극적인 SNS 홍보', '좁은 통로', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000014', 'seller', 4, 5, 4, 4, 5, '100~150만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'합리적인 참가비', '주차 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000014', 'seller', 3, 2, 2, 3, 3, '100~150만', ARRAY['10대','20대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '좁은 통로', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000015', 'seller', 2, 4, 2, 4, 4, '0~20만', ARRAY['20대','40대'], ARRAY['친구 / 지인'], '적극적인 SNS 홍보', '홍보 부족', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000015', 'seller', 3, 3, 4, 4, 3, '40~60만', ARRAY['10대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000015', 'seller', 5, 4, 3, 4, 5, '60~80만', ARRAY['40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'적극적인 SNS 홍보', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000016', 'seller', 5, 2, 4, 4, 1, '80~100만', ARRAY['30대','50대 이상'], ARRAY['친구 / 지인'], '적극적인 SNS 홍보'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000016', 'seller', 5, 4, 5, 5, 2, '100~150만', ARRAY['20대','30대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'높은 구매력', '운영 미흡', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000016', 'seller', 4, 2, 4, 5, 3, '20~40만', ARRAY['전 연령층','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력', '주최사 소통 부재', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000016', 'seller', 4, 4, 3, 4, 4, '20~40만', ARRAY['30대','10대'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000016', 'seller', 4, 4, 5, 3, 3, '60~80만', ARRAY['10대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000018', 'seller', 2, 5, 2, 4, 1, '100~150만', ARRAY['30대','10대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000018', 'seller', 3, 5, 4, 5, 2, '20~40만', ARRAY['20대','40대'], ARRAY['가족 단위 (아이 동반)'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000020', 'seller', 3, 3, 2, 4, 3, '60~80만', ARRAY['50대 이상','전 연령층'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'높은 집객력', '그늘 없음', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000020', 'seller', 3, 2, 5, 3, 5, '0~20만', ARRAY['40대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000020', 'seller', 4, 2, 3, 3, 5, '60~80만', ARRAY['50대 이상','30대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'높은 집객력', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000020', 'seller', 5, 5, 4, 3, 4, '100~150만', ARRAY['30대','50대 이상'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'체계적인 행사 운영', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000021', 'seller', 5, 2, 4, 4, 3, '80~100만', ARRAY['50대 이상','40대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'높은 구매력', '주차 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000021', 'seller', 4, 5, 4, 2, 1, '0~20만', ARRAY['30대','전 연령층'], ARRAY['커플 / 연인'], '친절한 운영진'||E'\n'||'합리적인 참가비', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000021', 'seller', 5, 4, 2, 2, 3, '0~20만', ARRAY['10대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'높은 집객력', '그늘 없음', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000021', 'seller', 5, 5, 4, 3, 1, '80~100만', ARRAY['40대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진'||E'\n'||'좋은 접근성', '좁은 통로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000023', 'seller', 4, 3, 3, 4, 1, '60~80만', ARRAY['50대 이상'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000023', 'seller', 4, 2, 5, 5, 3, '80~100만', ARRAY['10대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'적극적인 SNS 홍보', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000023', 'seller', 3, 2, 4, 5, 4, '20~40만', ARRAY['20대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성'||E'\n'||'친절한 운영진', '주최사 소통 부재', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000023', 'seller', 2, 5, 4, 5, 4, '0~20만', ARRAY['10대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'적극적인 SNS 홍보', '홍보 부족', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000024', 'seller', 2, 4, 2, 4, 4, '40~60만', ARRAY['20대','50대 이상'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'체계적인 행사 운영', '비싼 부스비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000024', 'seller', 2, 4, 3, 4, 2, '20~40만', ARRAY['30대','50대 이상'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'좋은 접근성', '주최사 소통 부재', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000025', 'seller', 5, 4, 2, 5, 4, '60~80만', ARRAY['40대','30대'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '주차 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000025', 'seller', 4, 2, 4, 4, 3, '40~60만', ARRAY['30대','40대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '좁은 통로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000025', 'seller', 4, 2, 3, 5, 4, '40~60만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 집객력', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000025', 'seller', 4, 2, 5, 5, 2, '80~100만', ARRAY['30대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '그늘 없음', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000026', 'seller', 4, 3, 5, 5, 2, '0~20만', ARRAY['50대 이상','20대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'체계적인 행사 운영', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000026', 'seller', 5, 2, 5, 3, 5, '0~20만', ARRAY['10대','20대'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'좋은 접근성', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000026', 'seller', 5, 3, 2, 2, 5, '0~20만', ARRAY['50대 이상','20대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'친절한 운영진', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000026', 'seller', 5, 5, 3, 5, 1, '100~150만', ARRAY['40대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000027', 'seller', 4, 5, 4, 3, 5, '0~20만', ARRAY['40대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000027', 'seller', 5, 5, 5, 3, 3, '80~100만', ARRAY['20대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력', '비싼 부스비', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000028', 'seller', 4, 2, 4, 5, 3, '0~20만', ARRAY['40대','20대'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000030', 'seller', 2, 5, 4, 5, 5, '60~80만', ARRAY['20대','40대'], ARRAY['가족 단위 (아이 동반)'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000030', 'seller', 4, 5, 4, 4, 5, '100~150만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '주최사 소통 부재', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000030', 'seller', 3, 4, 3, 3, 5, '0~20만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '합리적인 참가비', '그늘 없음', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000031', 'seller', 3, 2, 3, 4, 2, '20~40만', ARRAY['20대','40대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'높은 집객력', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000032', 'seller', 2, 3, 4, 2, 3, '40~60만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '비싼 부스비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000033', 'seller', 2, 5, 3, 5, 4, '60~80만', ARRAY['전 연령층','30대'], ARRAY['친구 / 지인'], '체계적인 행사 운영', '좁은 부스 공간', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000034', 'seller', 2, 4, 5, 4, 5, '40~60만', ARRAY['30대','전 연령층'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'좋은 접근성', '주차 불편', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000034', 'seller', 4, 5, 5, 4, 1, '40~60만', ARRAY['20대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '운영 미흡', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000034', 'seller', 2, 5, 4, 2, 5, '20~40만', ARRAY['40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '체계적인 행사 운영'||E'\n'||'합리적인 참가비', '운영 미흡', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000034', 'seller', 3, 4, 4, 5, 2, '0~20만', ARRAY['20대'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000034', 'seller', 4, 3, 4, 2, 4, '0~20만', ARRAY['30대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000035', 'seller', 5, 4, 2, 2, 2, '20~40만', ARRAY['40대','20대'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성'||E'\n'||'친절한 운영진', '홍보 부족', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000035', 'seller', 2, 5, 2, 4, 1, '80~100만', ARRAY['20대','전 연령층'], ARRAY['관광객 / 외국인'], '친절한 운영진'||E'\n'||'높은 집객력', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000035', 'seller', 3, 3, 5, 4, 1, '60~80만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'높은 집객력', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000035', 'seller', 4, 4, 4, 3, 1, '100~150만', ARRAY['10대','40대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'친절한 운영진', '그늘 없음', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000036', 'seller', 5, 2, 2, 5, 1, '100~150만', ARRAY['10대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000036', 'seller', 5, 3, 2, 4, 4, '20~40만', ARRAY['10대','30대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비', '비싼 부스비', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000038', 'seller', 4, 3, 2, 4, 5, '40~60만', ARRAY['30대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '주차 불편', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000038', 'seller', 5, 4, 5, 4, 2, '80~100만', ARRAY['40대'], ARRAY['가족 단위 (아이 동반)'], '높은 구매력'||E'\n'||'높은 집객력', '비싼 부스비', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000038', 'seller', 3, 5, 4, 5, 5, '80~100만', ARRAY['전 연령층','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '체계적인 행사 운영'||E'\n'||'적극적인 SNS 홍보', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000038', 'seller', 4, 2, 5, 4, 5, '100~150만', ARRAY['50대 이상','10대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '그늘 없음', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000038', 'seller', 4, 2, 2, 5, 3, '20~40만', ARRAY['20대','40대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000039', 'seller', 2, 5, 5, 2, 3, '0~20만', ARRAY['50대 이상','10대'], ARRAY['커플 / 연인'], '넓은 부스 공간', '주차 불편', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000039', 'seller', 3, 3, 2, 5, 4, '40~60만', ARRAY['30대','10대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000039', 'seller', 2, 4, 2, 2, 4, '80~100만', ARRAY['30대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000039', 'seller', 4, 2, 2, 3, 4, '80~100만', ARRAY['30대'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '주최사 소통 부재', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000040', 'seller', 5, 4, 2, 4, 2, '100~150만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '높은 구매력'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000040', 'seller', 4, 4, 3, 3, 3, '20~40만', ARRAY['40대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'적극적인 SNS 홍보', '홍보 부족', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000040', 'seller', 2, 4, 4, 5, 3, '60~80만', ARRAY['50대 이상'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'체계적인 행사 운영', '홍보 부족', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000040', 'seller', 2, 5, 4, 3, 2, '60~80만', ARRAY['30대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000042', 'seller', 2, 5, 3, 4, 5, '20~40만', ARRAY['40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'체계적인 행사 운영', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000042', 'seller', 2, 5, 5, 5, 1, '20~40만', ARRAY['20대','전 연령층'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'친절한 운영진', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000042', 'seller', 5, 2, 2, 4, 3, '0~20만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'넓은 부스 공간', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000042', 'seller', 5, 5, 4, 5, 2, '40~60만', ARRAY['30대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력'||E'\n'||'체계적인 행사 운영', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000043', 'seller', 2, 4, 4, 5, 4, '60~80만', ARRAY['20대','10대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '좁은 부스 공간', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000043', 'seller', 4, 5, 5, 5, 2, '80~100만', ARRAY['10대'], ARRAY['커플 / 연인'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000045', 'seller', 2, 3, 3, 4, 5, '100~150만', ARRAY['30대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'좋은 접근성', '운영 미흡', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000045', 'seller', 2, 2, 5, 5, 3, '0~20만', ARRAY['20대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'높은 구매력', '그늘 없음', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000045', 'seller', 2, 3, 4, 3, 1, '0~20만', ARRAY['30대'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'높은 구매력', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000045', 'seller', 4, 5, 5, 2, 2, '40~60만', ARRAY['20대','30대'], ARRAY['커플 / 연인'], '높은 집객력', '비싼 부스비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000045', 'seller', 5, 3, 3, 2, 3, '20~40만', ARRAY['40대'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'넓은 부스 공간', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000046', 'seller', 3, 4, 5, 5, 4, '0~20만', ARRAY['20대','30대'], ARRAY['커플 / 연인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '그늘 없음', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000046', 'seller', 4, 2, 4, 2, 3, '60~80만', ARRAY['50대 이상','30대'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진'||E'\n'||'넓은 부스 공간', '홍보 부족', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000046', 'seller', 3, 3, 5, 4, 4, '40~60만', ARRAY['20대','10대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영', '그늘 없음', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000046', 'seller', 4, 4, 4, 3, 5, '40~60만', ARRAY['20대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '그늘 없음', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000047', 'seller', 4, 5, 3, 3, 2, '80~100만', ARRAY['10대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000047', 'seller', 2, 4, 2, 3, 3, '80~100만', ARRAY['20대','30대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'체계적인 행사 운영', '홍보 부족', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000049', 'seller', 2, 2, 5, 2, 2, '40~60만', ARRAY['10대','전 연령층'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '좁은 부스 공간', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000049', 'seller', 5, 4, 3, 4, 3, '100~150만', ARRAY['10대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'친절한 운영진', '홍보 부족', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000049', 'seller', 5, 4, 4, 2, 4, '40~60만', ARRAY['전 연령층','20대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'체계적인 행사 운영', '비싼 부스비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000049', 'seller', 2, 5, 5, 5, 3, '60~80만', ARRAY['10대','20대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'넓은 부스 공간', '그늘 없음', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000049', 'seller', 3, 2, 3, 5, 1, '20~40만', ARRAY['10대','20대'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'합리적인 참가비', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '15 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000050', 'seller', 4, 2, 3, 4, 4, '60~80만', ARRAY['20대','30대'], ARRAY['가족 단위 (아이 동반)'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000050', 'seller', 2, 3, 3, 4, 1, '60~80만', ARRAY['50대 이상','전 연령층'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'높은 구매력', '그늘 없음', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000051', 'seller', 5, 5, 4, 5, 4, '60~80만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 집객력', '그늘 없음', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000051', 'seller', 2, 4, 4, 5, 1, '0~20만', ARRAY['40대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 집객력'||E'\n'||'높은 구매력', '운영 미흡', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000051', 'seller', 3, 4, 5, 3, 3, '100~150만', ARRAY['10대','50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'좋은 접근성', '운영 미흡', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000051', 'seller', 4, 3, 4, 4, 3, '100~150만', ARRAY['10대','40대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'높은 구매력', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000051', 'seller', 5, 4, 3, 4, 1, '100~150만', ARRAY['10대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '좁은 부스 공간', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000052', 'seller', 4, 5, 3, 3, 1, '100~150만', ARRAY['20대','10대'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'친절한 운영진', '비싼 부스비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000052', 'seller', 4, 4, 3, 3, 1, '40~60만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 구매력', '좁은 통로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000052', 'seller', 5, 2, 3, 4, 1, '60~80만', ARRAY['10대'], ARRAY['관광객 / 외국인'], '높은 집객력'||E'\n'||'합리적인 참가비', '운영 미흡', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000052', 'seller', 4, 3, 5, 5, 1, '60~80만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '높은 집객력'||E'\n'||'넓은 부스 공간', '그늘 없음', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000052', 'seller', 5, 5, 4, 3, 3, '100~150만', ARRAY['전 연령층','40대'], ARRAY['가족 단위 (아이 동반)'], '친절한 운영진', '좁은 통로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000053', 'seller', 5, 5, 2, 5, 2, '40~60만', ARRAY['10대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'높은 집객력', '주차 불편', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000053', 'seller', 5, 4, 3, 2, 1, '60~80만', ARRAY['전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'넓은 부스 공간', '비싼 부스비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000054', 'seller', 3, 2, 4, 3, 3, '60~80만', ARRAY['40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'높은 구매력', '운영 미흡', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000054', 'seller', 3, 4, 2, 4, 3, '0~20만', ARRAY['30대','전 연령층'], ARRAY['관광객 / 외국인'], '합리적인 참가비', '비싼 부스비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000055', 'seller', 4, 3, 2, 3, 2, '60~80만', ARRAY['30대','50대 이상'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000056', 'seller', 3, 3, 5, 2, 5, '40~60만', ARRAY['20대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '좋은 접근성'||E'\n'||'체계적인 행사 운영', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000056', 'seller', 3, 2, 3, 3, 3, '20~40만', ARRAY['50대 이상'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'높은 집객력', '좁은 통로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '12 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000057', 'seller', 5, 5, 4, 5, 2, '60~80만', ARRAY['50대 이상','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'높은 구매력', '좁은 부스 공간', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000057', 'seller', 2, 2, 5, 3, 1, '100~150만', ARRAY['50대 이상','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력'||E'\n'||'높은 집객력', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000059', 'seller', 4, 5, 3, 4, 5, '20~40만', ARRAY['10대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력', '주차 불편', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000059', 'seller', 5, 5, 4, 4, 1, '0~20만', ARRAY['30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 SNS 홍보'||E'\n'||'체계적인 행사 운영', '비싼 부스비', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000060', 'seller', 2, 4, 3, 5, 3, '0~20만', ARRAY['20대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'체계적인 행사 운영', '좁은 통로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000060', 'seller', 3, 3, 3, 4, 4, '0~20만', ARRAY['50대 이상'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력'||E'\n'||'합리적인 참가비', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000060', 'seller', 2, 4, 5, 4, 2, '80~100만', ARRAY['30대','40대'], ARRAY['관광객 / 외국인'], '체계적인 행사 운영'||E'\n'||'좋은 접근성', '그늘 없음', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000060', 'seller', 3, 5, 4, 2, 1, '80~100만', ARRAY['30대','40대'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000060', 'seller', 4, 5, 2, 2, 3, '40~60만', ARRAY['30대','20대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '좁은 통로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000061', 'seller', 4, 2, 3, 3, 4, '100~150만', ARRAY['30대'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'체계적인 행사 운영', '그늘 없음', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000061', 'seller', 3, 4, 4, 2, 2, '20~40만', ARRAY['40대'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 구매력', '주차 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000061', 'seller', 5, 4, 3, 4, 3, '100~150만', ARRAY['30대','40대'], ARRAY['커플 / 연인'], '좋은 접근성'||E'\n'||'높은 구매력', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '28 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000062', 'seller', 5, 3, 2, 3, 1, '100~150만', ARRAY['30대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'좋은 접근성', '그늘 없음', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000063', 'seller', 4, 4, 2, 5, 5, '0~20만', ARRAY['40대','20대'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보', '주차 불편', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000063', 'seller', 2, 5, 4, 5, 1, '80~100만', ARRAY['전 연령층','30대'], ARRAY['가족 단위 (아이 동반)'], '적극적인 SNS 홍보'||E'\n'||'좋은 접근성', '홍보 부족', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000063', 'seller', 5, 5, 3, 2, 1, '80~100만', ARRAY['50대 이상','30대'], ARRAY['친구 / 지인'], '높은 구매력', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000063', 'seller', 2, 2, 5, 2, 3, '0~20만', ARRAY['30대','10대'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'합리적인 참가비', '좁은 부스 공간', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000064', 'seller', 3, 5, 5, 5, 5, '20~40만', ARRAY['30대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간', '좁은 부스 공간', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '9 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000064', 'seller', 4, 4, 5, 4, 3, '80~100만', ARRAY['40대','50대 이상'], ARRAY['관광객 / 외국인'], '좋은 접근성', '그늘 없음', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000064', 'seller', 4, 5, 2, 5, 5, '40~60만', ARRAY['40대','10대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'친절한 운영진', '그늘 없음', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '30 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000065', 'seller', 5, 3, 3, 2, 5, '40~60만', ARRAY['50대 이상','30대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'높은 구매력', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000065', 'seller', 2, 5, 3, 5, 4, '40~60만', ARRAY['40대','전 연령층'], ARRAY['친구 / 지인'], '넓은 부스 공간'||E'\n'||'좋은 접근성', '좁은 부스 공간', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000065', 'seller', 4, 3, 5, 4, 5, '20~40만', ARRAY['30대','10대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '좁은 부스 공간', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000065', 'seller', 5, 4, 2, 4, 1, '100~150만', ARRAY['50대 이상','30대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'합리적인 참가비', '운영 미흡', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000066', 'seller', 2, 5, 5, 4, 2, '20~40만', ARRAY['10대','50대 이상'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보', '운영 미흡', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000066', 'seller', 5, 5, 5, 2, 1, '0~20만', ARRAY['40대'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'합리적인 참가비', '홍보 부족', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000067', 'seller', 4, 4, 4, 4, 1, '20~40만', ARRAY['50대 이상','20대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'넓은 부스 공간', '주차 불편', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000067', 'seller', 3, 3, 4, 4, 4, '60~80만', ARRAY['30대','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '16 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000068', 'seller', 4, 3, 3, 2, 4, '40~60만', ARRAY['30대','50대 이상'], ARRAY['커플 / 연인'], '적극적인 SNS 홍보'||E'\n'||'합리적인 참가비', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000068', 'seller', 3, 4, 4, 4, 5, '0~20만', ARRAY['30대','50대 이상'], ARRAY['커플 / 연인'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000068', 'seller', 2, 3, 4, 4, 3, '20~40만', ARRAY['10대','50대 이상'], ARRAY['친구 / 지인'], '좋은 접근성'||E'\n'||'높은 집객력', '주차 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000068', 'seller', 5, 4, 3, 4, 1, '80~100만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'높은 집객력', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000069', 'seller', 3, 4, 5, 5, 3, '20~40만', ARRAY['40대','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '넓은 부스 공간'||E'\n'||'높은 집객력', '그늘 없음', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000069', 'seller', 5, 4, 5, 2, 3, '100~150만', ARRAY['20대','전 연령층'], ARRAY['관광객 / 외국인'], '높은 집객력', '운영 미흡', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000069', 'seller', 3, 4, 5, 4, 2, '100~150만', ARRAY['50대 이상','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'넓은 부스 공간', '운영 미흡', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000069', 'seller', 4, 4, 4, 5, 3, '20~40만', ARRAY['30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '합리적인 참가비'||E'\n'||'넓은 부스 공간', '홍보 부족', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '20 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000069', 'seller', 3, 4, 5, 3, 3, '100~150만', ARRAY['40대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '높은 구매력'||E'\n'||'넓은 부스 공간', '그늘 없음', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000070', 'seller', 3, 4, 2, 2, 5, '60~80만', ARRAY['30대'], ARRAY['친구 / 지인'], '친절한 운영진'||E'\n'||'높은 구매력', '그늘 없음', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000070', 'seller', 5, 2, 2, 5, 2, '20~40만', ARRAY['30대'], ARRAY['관광객 / 외국인'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '좁은 통로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000070', 'seller', 4, 2, 4, 4, 3, '0~20만', ARRAY['50대 이상','10대'], ARRAY['관광객 / 외국인'], '적극적인 SNS 홍보'||E'\n'||'넓은 부스 공간', '홍보 부족', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000070', 'seller', 3, 5, 2, 3, 3, '0~20만', ARRAY['전 연령층','30대'], ARRAY['친구 / 지인'], '높은 구매력'||E'\n'||'친절한 운영진', '좁은 부스 공간', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000070', 'seller', 5, 4, 2, 5, 1, '0~20만', ARRAY['50대 이상','40대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'적극적인 SNS 홍보', '주차 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000072', 'seller', 3, 5, 2, 5, 2, '20~40만', ARRAY['40대','20대'], ARRAY['친구 / 지인'], '합리적인 참가비'||E'\n'||'높은 구매력', '좁은 통로', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000072', 'seller', 3, 3, 4, 5, 2, '40~60만', ARRAY['30대'], ARRAY['친구 / 지인'], '체계적인 행사 운영'||E'\n'||'친절한 운영진', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000072', 'seller', 4, 3, 3, 5, 4, '100~150만', ARRAY['10대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'넓은 부스 공간', '주최사 소통 부재', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000073', 'seller', 2, 4, 5, 3, 2, '100~150만', ARRAY['30대','40대'], ARRAY['커플 / 연인'], '높은 구매력'||E'\n'||'적극적인 SNS 홍보', '그늘 없음', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000074', 'seller', 3, 5, 2, 5, 2, '0~20만', ARRAY['10대'], ARRAY['가족 단위 (아이 동반)'], '좋은 접근성'||E'\n'||'합리적인 참가비', '좁은 부스 공간', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000074', 'seller', 4, 3, 3, 3, 2, '60~80만', ARRAY['20대','10대'], ARRAY['관광객 / 외국인'], '넓은 부스 공간'||E'\n'||'합리적인 참가비', '좁은 통로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000074', 'seller', 3, 2, 4, 2, 1, '60~80만', ARRAY['20대','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '친절한 운영진'||E'\n'||'체계적인 행사 운영', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000074', 'seller', 5, 4, 3, 4, 1, '60~80만', ARRAY['전 연령층','40대'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'높은 구매력', '좁은 통로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000075', 'seller', 5, 2, 5, 4, 4, '0~20만', ARRAY['40대','20대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'친절한 운영진', '비싼 부스비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '11 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000075', 'seller', 2, 2, 4, 3, 5, '60~80만', ARRAY['20대','50대 이상'], ARRAY['관광객 / 외국인'], '좋은 접근성'||E'\n'||'넓은 부스 공간', '좁은 부스 공간', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000075', 'seller', 2, 5, 2, 4, 1, '0~20만', ARRAY['50대 이상','40대'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'적극적인 SNS 홍보', '비싼 부스비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000075', 'seller', 5, 5, 4, 2, 1, '40~60만', ARRAY['40대','10대'], ARRAY['커플 / 연인'], '높은 집객력'||E'\n'||'높은 구매력', '주차 불편', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '19 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000077', 'foodtruck', 5, 5, 5, 3, 4, '200~300만', ARRAY['10대','50대 이상'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'높은 집객력', '전압 불안정', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000077', 'foodtruck', 5, 3, 5, 2, 1, '0~30만', ARRAY['40대','30대'], ARRAY['커플 / 연인'], '합리적인 참가비'||E'\n'||'안정적 전력 공급', '폐기물 처리 불편', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000078', 'foodtruck', 4, 3, 2, 5, 5, '150~200만', ARRAY['전 연령층','30대'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'안정적 전력 공급', '좁은 진입로', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000080', 'foodtruck', 2, 4, 5, 3, 4, '200~300만', ARRAY['30대','50대 이상'], ARRAY['커플 / 연인'], '우수한 입지'||E'\n'||'충분한 공간', '주최사 소통 부재', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000080', 'foodtruck', 2, 4, 3, 4, 1, '200~300만', ARRAY['50대 이상','30대'], ARRAY['가족 단위 (아이 동반)'], '넓은 진입로'||E'\n'||'높은 집객력', '폐기물 처리 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '3 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000015', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 4, 4, 4, 4, 3, '100~150만', ARRAY['50대 이상'], ARRAY['관광객 / 외국인'], '적극적인 홍보'||E'\n'||'넓은 진입로', '좁은 진입로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 4, 4, 4, 2, 2, '0~30만', ARRAY['20대'], ARRAY['가족 단위 (아이 동반)'], '안정적 전력 공급'||E'\n'||'넓은 진입로', '폐기물 처리 불편', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 3, 2, 5, 4, 3, '150~200만', ARRAY['10대','40대'], ARRAY['커플 / 연인'], '안정적 전력 공급'||E'\n'||'우수한 입지', '비싼 참가비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000082', 'foodtruck', 5, 2, 3, 2, 1, '70~100만', ARRAY['40대'], ARRAY['가족 단위 (아이 동반)'], '충분한 공간'||E'\n'||'합리적인 참가비', '좁은 진입로', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000083', 'foodtruck', 4, 2, 3, 4, 3, '200~300만', ARRAY['20대','40대'], ARRAY['가족 단위 (아이 동반)'], '넓은 진입로'||E'\n'||'합리적인 참가비', '좁은 진입로', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000083', 'foodtruck', 3, 5, 3, 4, 1, '200~300만', ARRAY['30대','20대'], ARRAY['커플 / 연인'], '적극적인 홍보'||E'\n'||'안정적 전력 공급', '비싼 참가비', '주차가 불편해서 짐 옮기기 힘들었어요. 그 외에는 만족.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000083', 'foodtruck', 4, 3, 2, 4, 5, '70~100만', ARRAY['30대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '안정적 전력 공급'||E'\n'||'적극적인 홍보', '홍보 부족', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 2, 2, 3, 4, 2, '100~150만', ARRAY['40대','30대'], ARRAY['가족 단위 (아이 동반)'], '넓은 진입로'||E'\n'||'높은 집객력', '비싼 참가비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 3, 4, 3, 4, 4, '150~200만', ARRAY['20대'], ARRAY['관광객 / 외국인'], '안정적 전력 공급'||E'\n'||'충분한 공간', '좁은 진입로', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000084', 'foodtruck', 2, 5, 2, 4, 3, '200~300만', ARRAY['30대'], ARRAY['커플 / 연인'], '적극적인 홍보'||E'\n'||'넓은 진입로', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000013', 'f1000000-0000-0000-0000-000000000085', 'foodtruck', 3, 3, 3, 4, 3, '30~70만', ARRAY['20대','10대'], ARRAY['커플 / 연인'], '넓은 진입로', '비싼 참가비', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '25 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000017', 'f1000000-0000-0000-0000-000000000085', 'foodtruck', 5, 4, 2, 2, 1, '100~150만', ARRAY['50대 이상','30대'], ARRAY['나홀로 방문객 (혼쇼족)'], '안정적 전력 공급', '비싼 참가비', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000086', 'foodtruck', 5, 5, 3, 2, 1, '200~300만', ARRAY['40대','20대'], ARRAY['친구 / 지인'], '우수한 입지', '전압 불안정', '전반적으로 만족스러운 행사였어요. 다음에도 참가하고 싶습니다.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000086', 'foodtruck', 4, 3, 4, 3, 5, '70~100만', ARRAY['50대 이상','20대'], ARRAY['가족 단위 (아이 동반)'], '충분한 공간'||E'\n'||'높은 집객력', '좁은 진입로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 5, 2, 2, 2, 2, '0~30만', ARRAY['40대','20대'], ARRAY['관광객 / 외국인'], '우수한 입지'||E'\n'||'넓은 진입로', '전압 불안정', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 2, 3, 3, 2, 1, '100~150만', ARRAY['20대','10대'], ARRAY['가족 단위 (아이 동반)'], '충분한 공간'||E'\n'||'합리적인 참가비', '좁은 진입로', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '18 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 4, 3, 4, 5, 4, '70~100만', ARRAY['30대','10대'], ARRAY['친구 / 지인'], '안정적 전력 공급'||E'\n'||'충분한 공간', '전압 불안정', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '23 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000087', 'foodtruck', 4, 2, 3, 5, 1, '70~100만', ARRAY['20대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'적극적인 홍보', '전압 불안정', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 3, 4, 3, 3, 3, '100~150만', ARRAY['50대 이상'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'적극적인 홍보', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '27 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 4, 4, 5, 5, 1, '100~150만', ARRAY['10대','30대'], ARRAY['커플 / 연인'], '안정적 전력 공급'||E'\n'||'우수한 입지', '좁은 진입로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 5, 4, 3, 4, 2, '70~100만', ARRAY['40대','전 연령층'], ARRAY['나홀로 방문객 (혼쇼족)'], '적극적인 홍보'||E'\n'||'합리적인 참가비', '좁은 진입로', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '2 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 2, 5, 2, 3, 3, '200~300만', ARRAY['30대','전 연령층'], ARRAY['관광객 / 외국인'], '우수한 입지', '전압 불안정', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000088', 'foodtruck', 2, 3, 2, 2, 2, '150~200만', ARRAY['10대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '우수한 입지'||E'\n'||'적극적인 홍보', '비싼 참가비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '24 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000014', 'f1000000-0000-0000-0000-000000000089', 'foodtruck', 2, 4, 3, 5, 5, '0~30만', ARRAY['20대','30대'], ARRAY['가족 단위 (아이 동반)'], '적극적인 홍보'||E'\n'||'충분한 공간', '좁은 진입로', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000090', 'foodtruck', 3, 5, 3, 3, 2, '0~30만', ARRAY['50대 이상','40대'], ARRAY['친구 / 지인'], '안정적 전력 공급'||E'\n'||'적극적인 홍보', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 2, 5, 4, 5, 3, '0~30만', ARRAY['전 연령층','50대 이상'], ARRAY['관광객 / 외국인'], '적극적인 홍보'||E'\n'||'충분한 공간', '전압 불안정', '운영진이 친절하고 체계적이었어요. 자리 배정도 공평했습니다.', NOW() - interval '14 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 2, 3, 2, 4, 2, '200~300만', ARRAY['10대','전 연령층'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'높은 집객력', '비싼 참가비', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '1 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000016', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 3, 3, 3, 2, 2, '150~200만', ARRAY['50대 이상','40대'], ARRAY['커플 / 연인'], '적극적인 홍보'||E'\n'||'넓은 진입로', '좁은 진입로', '첫 참가였는데 분위기가 좋아서 긴장이 풀렸어요. 다음에도 올게요!', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000091', 'foodtruck', 3, 3, 2, 5, 5, '30~70만', ARRAY['전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 홍보'||E'\n'||'우수한 입지', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000092', 'foodtruck', 4, 4, 5, 2, 5, '100~150만', ARRAY['50대 이상','40대'], ARRAY['관광객 / 외국인'], '합리적인 참가비'||E'\n'||'우수한 입지', '홍보 부족', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '7 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000092', 'foodtruck', 4, 2, 4, 2, 2, '0~30만', ARRAY['50대 이상','10대'], ARRAY['나홀로 방문객 (혼쇼족)'], '안정적 전력 공급'||E'\n'||'합리적인 참가비', '전압 불안정', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '21 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000092', 'foodtruck', 2, 4, 4, 2, 4, '0~30만', ARRAY['30대','40대'], ARRAY['나홀로 방문객 (혼쇼족)'], '안정적 전력 공급'||E'\n'||'넓은 진입로', '좁은 진입로', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '26 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000018', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 4, 5, 5, 2, 5, '100~150만', ARRAY['30대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '높은 집객력'||E'\n'||'충분한 공간', '전압 불안정', '날씨가 좋아서 손님이 많았어요. 석양 시간대가 피크였습니다.', NOW() - interval '17 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 2, 3, 3, 5, 2, '100~150만', ARRAY['40대','10대'], ARRAY['가족 단위 (아이 동반)'], '적극적인 홍보'||E'\n'||'합리적인 참가비', '비싼 참가비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '6 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 4, 5, 2, 5, 4, '100~150만', ARRAY['40대','30대'], ARRAY['커플 / 연인'], '적극적인 홍보'||E'\n'||'넓은 진입로', '전압 불안정', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '10 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000094', 'foodtruck', 3, 4, 4, 3, 2, '150~200만', ARRAY['30대','10대'], ARRAY['친구 / 지인'], '충분한 공간'||E'\n'||'안정적 전력 공급', '주최사 소통 부재', '참가비 대비 매출이 괜찮았어요. 가성비 좋은 행사입니다.', NOW() - interval '8 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000011', 'f1000000-0000-0000-0000-000000000095', 'foodtruck', 4, 5, 4, 3, 5, '70~100만', ARRAY['50대 이상','전 연령층'], ARRAY['관광객 / 외국인'], '충분한 공간'||E'\n'||'넓은 진입로', '폐기물 처리 불편', '유동인구가 많아서 매출이 잘 나왔어요. 추천합니다!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000097', 'foodtruck', 2, 2, 3, 3, 4, '100~150만', ARRAY['50대 이상','전 연령층'], ARRAY['관광객 / 외국인'], '적극적인 홍보'||E'\n'||'안정적 전력 공급', '비싼 참가비', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '13 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000019', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 3, 3, 5, 2, 2, '100~150만', ARRAY['전 연령층','50대 이상'], ARRAY['친구 / 지인'], '우수한 입지'||E'\n'||'적극적인 홍보', '주최사 소통 부재', '주최사 소통이 빠르고 문제 생기면 바로 해결해줘서 좋았어요.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 3, 3, 4, 4, 5, '30~70만', ARRAY['30대','50대 이상'], ARRAY['가족 단위 (아이 동반)'], '안정적 전력 공급'||E'\n'||'충분한 공간', '주최사 소통 부재', '홍보가 좀 더 됐으면 하는 아쉬움이 있어요. 그래도 전체적으로 OK.', NOW() - interval '22 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 4, 2, 5, 4, 4, '100~150만', ARRAY['10대','50대 이상'], ARRAY['관광객 / 외국인'], '충분한 공간'||E'\n'||'안정적 전력 공급', '비싼 참가비', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '29 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000098', 'foodtruck', 2, 2, 4, 4, 1, '100~150만', ARRAY['40대','전 연령층'], ARRAY['가족 단위 (아이 동반)'], '합리적인 참가비'||E'\n'||'충분한 공간', '전압 불안정', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '5 days');
INSERT INTO public.reviews (event_instance_id, user_id, seller_type, rating_profit, rating_traffic, rating_support, rating_manners, rating_promotion, revenue_range, age_groups, visitor_types, pros, cons, content, created_at) VALUES ('c0000001-0000-0000-0000-000000000012', 'f1000000-0000-0000-0000-000000000100', 'foodtruck', 5, 3, 3, 4, 3, '150~200만', ARRAY['40대'], ARRAY['가족 단위 (아이 동반)'], '넓은 진입로'||E'\n'||'충분한 공간', '주최사 소통 부재', '단골 손님도 생기고 인스타 팔로워도 늘었어요. 브랜딩에 좋은 행사!', NOW() - interval '9 days');

-- ═══ 게시글 300개 ═══
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', '플리마켓 디피 꿀팁 공유해요 (37)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '양연우', false, 0, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000078', '거스름돈 얼마나 준비하세요? (95)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'foodtruck', '파스타트럭', false, 40, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000071', '우천 시 대비 어떻게 하시나요? (27)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '한남동', false, 25, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000036', '카드 결제 단말기 추천해주세요 (1)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '황서윤', false, 4, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '플리마켓에서 가장 잘 팔리는 품목은? (5)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '나다은', false, 12, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '혼자 플리마켓 참가하시는 분? (2)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '황연우', false, 39, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '여름 야외 마켓 생존 키트 (78)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '성건우', false, 32, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '셀러 보험 가입하신 분 계세요? (63)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'foodtruck', '성수감성', false, 19, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '포장재 어디서 구매하시나요? (49)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '곽은서', false, 44, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '마켓 끝나고 정산 어떻게 하세요? (55)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'foodtruck', '떡볶이천국', false, 43, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '첫 매출 100만원 달성 후기 (47)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '황유진', false, 25, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '마켓 참가 시 필요한 허가증이 있나요? (86)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'foodtruck', '디자이너', false, 20, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', 'SNS 마케팅 효과 있나요? (14)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '양연우', false, 46, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '겨울 마켓 참가 고민 (11)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '김서현', false, 39, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '같이 참가할 파트너 구합니다 (17)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '류승현', false, 6, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '푸드트럭 창업 비용 현실 (33)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'foodtruck', '떡볶이천국', false, 9, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000072', '마켓에서 만난 인연 (33)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '망원동살이', false, 43, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000046', '해외 플리마켓 경험 공유 (2)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '우서윤', false, 1, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000046', '셀러 명함 만드셨나요? (3)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '우서윤', false, 38, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '마켓 후 근육통 극복법 (76)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '홍대라이프', false, 48, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '플리마켓 디피 꿀팁 공유해요 (21)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '임정우', false, 4, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000048', '거스름돈 얼마나 준비하세요? (78)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '서서진', false, 7, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000041', '우천 시 대비 어떻게 하시나요? (80)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '나승현', false, 24, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '카드 결제 단말기 추천해주세요 (74)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'foodtruck', '한남동', false, 21, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '플리마켓에서 가장 잘 팔리는 품목은? (92)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '백하윤', false, 18, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000078', '혼자 플리마켓 참가하시는 분? (10)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'foodtruck', '파스타트럭', false, 30, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '여름 야외 마켓 생존 키트 (81)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'foodtruck', '일상공유', false, 22, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '셀러 보험 가입하신 분 계세요? (45)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '마켓러버', false, 0, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '포장재 어디서 구매하시나요? (36)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'foodtruck', '제주살이', false, 9, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '마켓 끝나고 정산 어떻게 하세요? (4)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '이서연', false, 25, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000025', '첫 매출 100만원 달성 후기 (51)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '문승우', false, 6, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '마켓 참가 시 필요한 허가증이 있나요? (51)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '나다은', false, 43, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000058', 'SNS 마케팅 효과 있나요? (99)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '하지윤', false, 21, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000056', '겨울 마켓 참가 고민 (15)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '유수빈', false, 42, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '같이 참가할 파트너 구합니다 (97)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'foodtruck', '떡볶이천국', false, 43, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000084', '푸드트럭 창업 비용 현실 (34)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'foodtruck', '마켓러버', false, 20, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '마켓에서 만난 인연 (74)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'foodtruck', '떡볶이천국', false, 21, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '해외 플리마켓 경험 공유 (77)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '김연우', false, 16, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '셀러 명함 만드셨나요? (17)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '김서현', false, 14, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000051', '마켓 후 근육통 극복법 (79)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '유서연', false, 2, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000060', '플리마켓 디피 꿀팁 공유해요 (31)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '성서현', false, 23, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '거스름돈 얼마나 준비하세요? (83)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '하서현', false, 24, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '우천 시 대비 어떻게 하시나요? (57)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '이서연', false, 37, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '카드 결제 단말기 추천해주세요 (69)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '황연우', false, 33, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000051', '플리마켓에서 가장 잘 팔리는 품목은? (50)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '유서연', false, 15, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '혼자 플리마켓 참가하시는 분? (30)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '송도현', false, 31, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '여름 야외 마켓 생존 키트 (39)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '오은우', false, 11, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', '셀러 보험 가입하신 분 계세요? (15)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'foodtruck', '플리초보', false, 13, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '포장재 어디서 구매하시나요? (80)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'foodtruck', '한남동', false, 25, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000042', '마켓 끝나고 정산 어떻게 하세요? (32)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '조윤서', false, 47, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000079', '첫 매출 100만원 달성 후기 (14)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'foodtruck', '한남동', false, 13, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '마켓 참가 시 필요한 허가증이 있나요? (92)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '손은서', false, 26, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', 'SNS 마케팅 효과 있나요? (76)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '양건우', false, 17, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000050', '겨울 마켓 참가 고민 (34)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '이도윤', false, 47, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '같이 참가할 파트너 구합니다 (68)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'foodtruck', '제주살이', false, 9, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '푸드트럭 창업 비용 현실 (96)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '오은우', false, 9, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '마켓에서 만난 인연 (44)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'foodtruck', '한남동', false, 39, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000022', '해외 플리마켓 경험 공유 (48)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '남태윤', false, 24, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000093', '셀러 명함 만드셨나요? (1)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'foodtruck', '홍대라이프', false, 0, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000043', '마켓 후 근육통 극복법 (52)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '송재윤', false, 20, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000065', '플리마켓 디피 꿀팁 공유해요 (54)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '한아린', false, 32, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '거스름돈 얼마나 준비하세요? (86)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '황연우', false, 24, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000003', '우천 시 대비 어떻게 하시나요? (92)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '우재윤', false, 50, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000014', '카드 결제 단말기 추천해주세요 (17)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '황하준', false, 10, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000043', '플리마켓에서 가장 잘 팔리는 품목은? (56)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '송재윤', false, 50, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000009', '혼자 플리마켓 참가하시는 분? (44)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '고시윤', false, 20, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '여름 야외 마켓 생존 키트 (49)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '하서현', false, 35, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '셀러 보험 가입하신 분 계세요? (46)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '홍대라이프', false, 44, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '포장재 어디서 구매하시나요? (90)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'foodtruck', '일상공유', false, 17, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '마켓 끝나고 정산 어떻게 하세요? (94)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '마켓러버', false, 44, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '첫 매출 100만원 달성 후기 (41)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '임지안', false, 38, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000061', '마켓 참가 시 필요한 허가증이 있나요? (95)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '정지안', false, 31, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', 'SNS 마케팅 효과 있나요? (99)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'foodtruck', '플리초보', false, 36, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '겨울 마켓 참가 고민 (16)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '류승현', false, 14, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '같이 참가할 파트너 구합니다 (20)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '나승현', false, 41, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '푸드트럭 창업 비용 현실 (79)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '김연우', false, 28, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000094', '마켓에서 만난 인연 (31)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'foodtruck', '이태원감성', false, 28, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000095', '해외 플리마켓 경험 공유 (71)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'foodtruck', '파스타트럭', false, 1, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '셀러 명함 만드셨나요? (80)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '송도현', false, 14, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '마켓 후 근육통 극복법 (94)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '송도현', false, 31, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000053', '플리마켓 디피 꿀팁 공유해요 (69)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '정현우', false, 3, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '거스름돈 얼마나 준비하세요? (67)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '우민준', false, 13, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '우천 시 대비 어떻게 하시나요? (8)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'foodtruck', '와플장인', false, 3, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000037', '카드 결제 단말기 추천해주세요 (94)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '성지우', false, 5, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000041', '플리마켓에서 가장 잘 팔리는 품목은? (30)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '나승현', false, 46, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '혼자 플리마켓 참가하시는 분? (98)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'foodtruck', '일상공유', false, 19, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000049', '여름 야외 마켓 생존 키트 (74)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '유유준', false, 41, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '셀러 보험 가입하신 분 계세요? (76)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '성건우', false, 38, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '포장재 어디서 구매하시나요? (28)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '임지안', false, 25, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '마켓 끝나고 정산 어떻게 하세요? (88)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '우민준', false, 50, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', '첫 매출 100만원 달성 후기 (59)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '양건우', false, 16, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000061', '마켓 참가 시 필요한 허가증이 있나요? (57)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'seller', '정지안', false, 33, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000064', 'SNS 마케팅 효과 있나요? (98)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '양승우', false, 36, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '겨울 마켓 참가 고민 (2)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'foodtruck', '일상공유', false, 45, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000028', '같이 참가할 파트너 구합니다 (56)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '배은우', false, 24, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '푸드트럭 창업 비용 현실 (52)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'foodtruck', '와플장인', false, 38, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000060', '마켓에서 만난 인연 (77)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'seller', '성서현', false, 27, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000084', '해외 플리마켓 경험 공유 (3)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'foodtruck', '마켓러버', false, 24, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '셀러 명함 만드셨나요? (78)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'foodtruck', '제주살이', false, 2, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000014', '마켓 후 근육통 극복법 (72)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '황하준', false, 32, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '플리마켓 디피 꿀팁 공유해요 (18)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'foodtruck', '디자이너', false, 39, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000057', '거스름돈 얼마나 준비하세요? (76)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '허건우', false, 12, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '우천 시 대비 어떻게 하시나요? (79)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '하서현', false, 49, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '카드 결제 단말기 추천해주세요 (47)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '황유진', false, 13, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '플리마켓에서 가장 잘 팔리는 품목은? (21)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '나승현', false, 22, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '혼자 플리마켓 참가하시는 분? (65)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '마켓러버', false, 37, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '여름 야외 마켓 생존 키트 (44)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'foodtruck', '한남동', false, 47, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000022', '셀러 보험 가입하신 분 계세요? (20)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '남태윤', false, 38, NOW() - interval '22 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000074', '포장재 어디서 구매하시나요? (82)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '마켓러버', false, 6, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000100', '마켓 끝나고 정산 어떻게 하세요? (19)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'foodtruck', '와플장인', false, 47, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000030', '첫 매출 100만원 달성 후기 (15)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '홍하준', false, 46, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '마켓 참가 시 필요한 허가증이 있나요? (47)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'foodtruck', '디자이너', false, 6, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000066', 'SNS 마케팅 효과 있나요? (66)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'seller', '오수아', false, 7, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '겨울 마켓 참가 고민 (37)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '장지호', false, 47, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000025', '같이 참가할 파트너 구합니다 (72)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '문승우', false, 13, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000021', '푸드트럭 창업 비용 현실 (75)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'seller', '노소윤', false, 4, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '마켓에서 만난 인연 (46)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'foodtruck', '일상공유', false, 46, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '해외 플리마켓 경험 공유 (47)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '이서연', false, 12, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000094', '셀러 명함 만드셨나요? (55)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'foodtruck', '이태원감성', false, 26, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '마켓 후 근육통 극복법 (8)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '조승현', false, 37, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000037', '플리마켓 디피 꿀팁 공유해요 (59)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'seller', '성지우', false, 9, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000054', '거스름돈 얼마나 준비하세요? (47)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '윤서연', false, 11, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '우천 시 대비 어떻게 하시나요? (72)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'foodtruck', '일상공유', false, 32, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '카드 결제 단말기 추천해주세요 (26)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '손은서', false, 31, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '플리마켓에서 가장 잘 팔리는 품목은? (8)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'seller', '우민준', false, 29, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '혼자 플리마켓 참가하시는 분? (32)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '김서현', false, 37, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '여름 야외 마켓 생존 키트 (85)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '백하윤', false, 17, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000030', '셀러 보험 가입하신 분 계세요? (31)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '홍하준', false, 14, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '포장재 어디서 구매하시나요? (40)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'foodtruck', '한남동', false, 42, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '마켓 끝나고 정산 어떻게 하세요? (46)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '김시은', false, 33, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '첫 매출 100만원 달성 후기 (68)', '드디어 월 매출 100만원을 달성했어요!

3개월간 매주 주말마다 마켓 나가고, 인스타도 열심히 했더니 단골이 생기기 시작했어요.

아직 본업 수준은 아니지만 뿌듯합니다.', '자유게시판', 'seller', '오은우', false, 10, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '마켓 참가 시 필요한 허가증이 있나요? (97)', '식품 판매하려면 위생교육 이수증이 필요하다던데 맞나요?

비식품(악세사리, 의류)은 별도 허가 없이 판매 가능한가요?

사업자등록증은 필수인가요?', '자유게시판', 'foodtruck', '제주살이', false, 50, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', 'SNS 마케팅 효과 있나요? (82)', '인스타그램으로 마켓 참가 소식 올리는데 효과가 있는지 모르겠어요.

팔로워는 느는데 실제 매출과 연결되는지...

효과적인 홍보 방법 공유해주세요!', '자유게시판', 'foodtruck', '부산셀러', false, 8, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000010', '겨울 마켓 참가 고민 (17)', '겨울에도 야외 마켓 참가하시나요?

손님도 적고 추운데...

실내 마켓은 부스비가 비싸서 고민이에요.', '자유게시판', 'seller', '남건우', false, 40, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '같이 참가할 파트너 구합니다 (15)', '혼자 마켓 참가하기 힘드신 분!

서울/경기 지역 플리마켓 같이 참가할 파트너 구해요.

부스비 반반, 판매도 번갈아가면서.

품목: 악세사리 (겹치지 않으면 좋겠어요)', '자유게시판', 'seller', '손은서', false, 15, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '푸드트럭 창업 비용 현실 (58)', '푸드트럭 창업 3개월 차인데 현실을 공유해요.

트럭 구매: 2500만원
개조비: 800만원
장비: 500만원

월 고정비: 약 150만원 (보험, 주차, 재료비)

월 평균 매출: 400~500만원
순수익: 150~200만원 정도예요.', '자유게시판', 'foodtruck', '한남동', false, 38, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000096', '마켓에서 만난 인연 (41)', '작년 홍대 프리마켓에서 옆 부스 셀러분을 만났는데

지금은 같이 브랜드 운영하고 있어요 ㅎㅎ

마켓의 좋은 점 중 하나가 이런 네트워킹이죠!', '자유게시판', 'foodtruck', '취미생활', false, 11, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000055', '해외 플리마켓 경험 공유 (34)', '일본 도쿄 오오이 경마장 플리마켓 다녀왔어요.

한국과 다른 점:
- 빈티지/중고 비율이 90%
- 가격이 매우 저렴 (100엔~)
- 음식 판매 거의 없음

한국 마켓이 더 다양하고 감성적인 것 같아요.', '자유게시판', 'seller', '우민준', false, 28, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '셀러 명함 만드셨나요? (18)', '명함이나 쇼핑카드 만드신 분 계세요?

인스타 QR코드 넣으면 좋다던데

어디서 인쇄하시나요? 비스타프린트? 미리캔버스?', '자유게시판', 'seller', '조승현', false, 33, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000015', '마켓 후 근육통 극복법 (60)', '하루 종일 서있다가 무거운 짐 옮기면 다음 날 근육통이...

깔창, 쿠션 매트 깔기, 스트레칭 다 해보는데

다른 좋은 방법 있나요?', '자유게시판', 'seller', '송도현', false, 48, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '플리마켓 디피 꿀팁 공유해요 (79)', '디피할 때 높낮이 차이를 주면 시선이 잘 가요.

1. 우드 박스로 단 만들기
2. 린넨 천 깔기
3. 조명은 LED 스트링라이트
4. 가격표는 크래프트지에 손글씨

이것만 해도 분위기 확 달라져요!', '자유게시판', 'foodtruck', '파스타트럭', false, 12, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '거스름돈 얼마나 준비하세요? (73)', '다음 주 첫 플리마켓 참가인데 거스름돈 준비가 고민이에요.

천원짜리 30장, 오천원짜리 10장 정도면 될까요?

선배 셀러분들은 보통 얼마나 준비하시나요?', '자유게시판', 'seller', '류하윤', false, 41, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '우천 시 대비 어떻게 하시나요? (69)', '야외 마켓 참가할 때 비 오면 어떻게 대처하시나요?

방수 커버? 캐노피? 아니면 그냥 안 가시나요?

지난번에 갑자기 비 와서 상품 다 젖었어요 ㅠㅠ', '자유게시판', 'seller', '류승현', false, 22, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '카드 결제 단말기 추천해주세요 (16)', '요즘 현금 안 들고 다니는 분이 많아서 카드 결제기 도입하려고요.

토스, 페이코, 키오스크 뭐가 좋을까요?
수수료도 비교해보고 싶어요.', '자유게시판', 'seller', '이서연', false, 19, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '플리마켓에서 가장 잘 팔리는 품목은? (49)', '여러 행사 참가해본 결과 정리해봤어요.

1위: 악세사리 (반지, 팔찌)
2위: 캔들/디퓨저
3위: 일러스트 엽서/스티커
4위: 빈티지 의류
5위: 수제 간식

다들 비슷한가요?', '자유게시판', 'foodtruck', '떡볶이천국', false, 34, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '혼자 플리마켓 참가하시는 분? (93)', '항상 혼자 참가하는데 화장실 갈 때가 제일 곤란해요.

옆 부스 셀러분께 부탁하거나 잠깐 비우는데...

혼자 하시는 분들 어떻게 하세요?', '자유게시판', 'seller', '김연우', false, 34, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000073', '여름 야외 마켓 생존 키트 (89)', '여름 야외 마켓 필수템 정리!

- 선크림 (수시로 덧바르기)
- 미니 선풍기 (클립형 추천)
- 얼음물 텀블러
- 양산 or 파라솔
- 쿨타올
- 모기 퇴치 스프레이

추가할 거 있으면 댓글!', '자유게시판', 'seller', '스무디트럭', false, 23, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '셀러 보험 가입하신 분 계세요? (13)', '마켓에서 손님이 상품 깨뜨리거나 사고 나면 어떡하죠?

셀러 보험 같은 거 가입하신 분 있나요?

비용이랑 보장 범위가 궁금합니다.', '자유게시판', 'seller', '임지안', false, 36, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000009', '포장재 어디서 구매하시나요? (17)', '크래프트 봉투, 스티커, 리본 등 포장재 대량 구매처 추천해주세요.

쿠팡? 알리? 아이디어스?

가성비 좋은 곳 알려주시면 감사!', '자유게시판', 'seller', '고시윤', false, 7, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '마켓 끝나고 정산 어떻게 하세요? (33)', '하루 매출 정리를 어떻게 하시나요?

엑셀? 가계부 앱? 노트?

세금 신고도 해야 하는지 궁금해요.', '자유게시판', 'seller', '하서현', false, 41, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '솔직히 플리마켓 수익 별로 아닌가요? (19)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 31, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000023', '주최사 갑질 경험 있으신 분? (82)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 0, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000026', '같은 행사 셀러끼리 경쟁이 심해요 (65)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 42, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '참가비 환불 안 해주는 주최사 (64)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 26, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '야시장에서 도난 당했어요 (6)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 16, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000090', '솔직히 플리마켓 수익 별로 아닌가요? (3)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 49, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000045', '주최사 갑질 경험 있으신 분? (22)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 12, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000089', '같은 행사 셀러끼리 경쟁이 심해요 (35)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 16, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '참가비 환불 안 해주는 주최사 (45)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 37, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000090', '야시장에서 도난 당했어요 (43)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'foodtruck', null, true, 12, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '솔직히 플리마켓 수익 별로 아닌가요? (71)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 38, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000090', '주최사 갑질 경험 있으신 분? (7)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'foodtruck', null, true, 15, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '같은 행사 셀러끼리 경쟁이 심해요 (6)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 49, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '참가비 환불 안 해주는 주최사 (65)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'foodtruck', null, true, 14, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '야시장에서 도난 당했어요 (49)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 0, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', '솔직히 플리마켓 수익 별로 아닌가요? (80)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 33, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000025', '주최사 갑질 경험 있으신 분? (94)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 25, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '같은 행사 셀러끼리 경쟁이 심해요 (48)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 23, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000033', '참가비 환불 안 해주는 주최사 (53)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 38, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000014', '야시장에서 도난 당했어요 (96)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 30, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '솔직히 플리마켓 수익 별로 아닌가요? (17)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 31, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000014', '주최사 갑질 경험 있으신 분? (89)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 20, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000097', '같은 행사 셀러끼리 경쟁이 심해요 (57)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 21, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '참가비 환불 안 해주는 주최사 (5)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 8, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000058', '야시장에서 도난 당했어요 (70)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 50, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '솔직히 플리마켓 수익 별로 아닌가요? (5)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 5, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000069', '주최사 갑질 경험 있으신 분? (57)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 41, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000068', '같은 행사 셀러끼리 경쟁이 심해요 (69)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 6, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000041', '참가비 환불 안 해주는 주최사 (63)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 29, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '야시장에서 도난 당했어요 (99)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 31, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '솔직히 플리마켓 수익 별로 아닌가요? (16)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 47, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000066', '주최사 갑질 경험 있으신 분? (52)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 31, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000091', '같은 행사 셀러끼리 경쟁이 심해요 (69)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 50, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000063', '참가비 환불 안 해주는 주최사 (19)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 31, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000093', '야시장에서 도난 당했어요 (35)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'foodtruck', null, true, 26, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', '솔직히 플리마켓 수익 별로 아닌가요? (59)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 17, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '주최사 갑질 경험 있으신 분? (95)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 32, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000002', '같은 행사 셀러끼리 경쟁이 심해요 (8)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 7, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000096', '참가비 환불 안 해주는 주최사 (17)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'foodtruck', null, true, 36, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000070', '야시장에서 도난 당했어요 (42)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 29, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '솔직히 플리마켓 수익 별로 아닌가요? (37)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'foodtruck', null, true, 45, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '주최사 갑질 경험 있으신 분? (66)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'foodtruck', null, true, 8, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', '같은 행사 셀러끼리 경쟁이 심해요 (19)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 35, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000053', '참가비 환불 안 해주는 주최사 (35)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 39, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '야시장에서 도난 당했어요 (51)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'foodtruck', null, true, 19, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '솔직히 플리마켓 수익 별로 아닌가요? (19)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 5, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '주최사 갑질 경험 있으신 분? (46)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 23, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000085', '같은 행사 셀러끼리 경쟁이 심해요 (12)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'foodtruck', null, true, 44, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '참가비 환불 안 해주는 주최사 (4)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'foodtruck', null, true, 31, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000096', '야시장에서 도난 당했어요 (41)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'foodtruck', null, true, 7, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000018', '솔직히 플리마켓 수익 별로 아닌가요? (78)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 41, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '주최사 갑질 경험 있으신 분? (41)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'seller', null, true, 44, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000024', '같은 행사 셀러끼리 경쟁이 심해요 (18)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 3, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '참가비 환불 안 해주는 주최사 (58)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'foodtruck', null, true, 30, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000064', '야시장에서 도난 당했어요 (25)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 10, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000073', '솔직히 플리마켓 수익 별로 아닌가요? (59)', '3개월째 플리마켓 참가 중인데 솔직히 부스비 빼면 남는 게 별로 없어요.

교통비, 식비, 재료비 다 빼면...

다들 이 정도인가요 아니면 제가 못하는 건가요?', '익명', 'seller', null, true, 30, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000081', '주최사 갑질 경험 있으신 분? (61)', '지난번 OO 마켓에서 주최사가 당일 자리 변경하고 항의하니까 무시당했어요.

사전 공지도 없이... 다른 분들도 이런 경험 있으신가요?', '익명', 'foodtruck', null, true, 22, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000062', '같은 행사 셀러끼리 경쟁이 심해요 (94)', '비슷한 품목 셀러가 바로 옆에 배치되면 진짜 스트레스에요.

가격 경쟁도 하게 되고...

주최사가 품목 분산 배치 좀 해줬으면.', '익명', 'seller', null, true, 2, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000005', '참가비 환불 안 해주는 주최사 (80)', '비가 와서 행사 취소됐는데 참가비 환불 안 해준다네요.

약관에 천재지변 시 환불 불가라고 써있다고 하는데 이게 맞나요?

소비자원 신고해야 하나...', '익명', 'seller', null, true, 39, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000054', '야시장에서 도난 당했어요 (37)', '어제 야시장에서 상품 도난 당했어요.

잠깐 자리 비운 사이에 악세사리 세트가 통째로...

CCTV 확인 요청했는데 주최사가 비협조적이에요.

다들 도난 방지 어떻게 하세요?', '익명', 'seller', null, true, 42, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '[현장] 여의도 야시장 현재 상황 (14)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'foodtruck', '한남동', false, 49, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000016', '[현장] 홍대 프리마켓 오늘 날씨 최고 (66)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '김연우', false, 2, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000026', '[현장] 성수 플리마켓 오픈 직후 (27)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '주민서', false, 25, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000012', '[현장] 해운대 선셋마켓 석양 미쳤다 (96)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '조민서', false, 39, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (96)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '일상공유', false, 45, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', '[현장] 여의도 야시장 현재 상황 (39)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '양연우', false, 0, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000069', '[현장] 홍대 프리마켓 오늘 날씨 최고 (72)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '오지호', false, 20, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000060', '[현장] 성수 플리마켓 오픈 직후 (11)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '성서현', false, 34, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '[현장] 해운대 선셋마켓 석양 미쳤다 (32)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '오은우', false, 17, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (93)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '파스타트럭', false, 2, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000040', '[현장] 여의도 야시장 현재 상황 (89)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '이아린', false, 0, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000031', '[현장] 홍대 프리마켓 오늘 날씨 최고 (37)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '장지호', false, 41, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '[현장] 성수 플리마켓 오픈 직후 (20)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '황연우', false, 50, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000058', '[현장] 해운대 선셋마켓 석양 미쳤다 (64)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '하지윤', false, 37, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000058', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (91)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '하지윤', false, 18, NOW() - interval '5 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000093', '[현장] 여의도 야시장 현재 상황 (67)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'foodtruck', '홍대라이프', false, 12, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '[현장] 홍대 프리마켓 오늘 날씨 최고 (3)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '백하윤', false, 42, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000003', '[현장] 성수 플리마켓 오픈 직후 (69)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '우재윤', false, 41, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '[현장] 해운대 선셋마켓 석양 미쳤다 (74)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '백하윤', false, 12, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000093', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (76)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '홍대라이프', false, 13, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000078', '[현장] 여의도 야시장 현재 상황 (23)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'foodtruck', '파스타트럭', false, 10, NOW() - interval '19 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000009', '[현장] 홍대 프리마켓 오늘 날씨 최고 (40)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '고시윤', false, 11, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000057', '[현장] 성수 플리마켓 오픈 직후 (11)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '허건우', false, 18, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '[현장] 해운대 선셋마켓 석양 미쳤다 (18)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '황연우', false, 17, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (66)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '인천마켓', false, 14, NOW() - interval '24 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000028', '[현장] 여의도 야시장 현재 상황 (59)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '배은우', false, 2, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000035', '[현장] 홍대 프리마켓 오늘 날씨 최고 (52)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '허소율', false, 7, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000096', '[현장] 성수 플리마켓 오픈 직후 (15)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'foodtruck', '취미생활', false, 50, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000021', '[현장] 해운대 선셋마켓 석양 미쳤다 (47)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '노소윤', false, 15, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (11)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '손은서', false, 9, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '[현장] 여의도 야시장 현재 상황 (83)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '성건우', false, 43, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000082', '[현장] 홍대 프리마켓 오늘 날씨 최고 (20)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'foodtruck', '한남동', false, 35, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000042', '[현장] 성수 플리마켓 오픈 직후 (34)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '조윤서', false, 41, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '[현장] 해운대 선셋마켓 석양 미쳤다 (29)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '곽은서', false, 3, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000037', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (94)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '성지우', false, 25, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000054', '[현장] 여의도 야시장 현재 상황 (51)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '윤서연', false, 18, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000083', '[현장] 홍대 프리마켓 오늘 날씨 최고 (18)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'foodtruck', '파스타트럭', false, 16, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000081', '[현장] 성수 플리마켓 오픈 직후 (32)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'foodtruck', '치킨트럭', false, 15, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '[현장] 해운대 선셋마켓 석양 미쳤다 (64)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '나다은', false, 12, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (25)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'foodtruck', '부산셀러', false, 31, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000013', '[현장] 여의도 야시장 현재 상황 (51)', '지금 여의도 야시장 현장이에요!

날씨 좋아서 사람 엄청 많아요.
7시 기준 매출 이미 30만 돌파.

오늘 컨디션 좋습니다 💪', '실시간 행사 현황', 'seller', '황연우', false, 47, NOW() - interval '20 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000034', '[현장] 홍대 프리마켓 오늘 날씨 최고 (99)', '홍대 프리마켓 현장입니다.

오늘 날씨가 너무 좋아서 손님이 많아요.
벚꽃 시즌이라 외국인 관광객도 많네요.

매출 기대됩니다!', '실시간 행사 현황', 'seller', '남서연', false, 37, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000060', '[현장] 성수 플리마켓 오픈 직후 (20)', '성수 플리마켓 방금 오픈했어요.

아직 사람이 많지는 않은데 성수 카페 갔다가 들르는 분들이 슬슬 오고 있어요.

오늘 신메뉴 캔들 반응 기대중!', '실시간 행사 현황', 'seller', '성서현', false, 50, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '[현장] 해운대 선셋마켓 석양 미쳤다 (65)', '해운대 선셋마켓 현장이에요.

석양이 진짜 예술입니다. 사진 찍으러 오는 분들이 많아서 SNS 홍보 효과 대박.

관광객 비율이 50% 넘는 듯.', '실시간 행사 현황', 'seller', '김시은', false, 50, NOW() - interval '13 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000006', '[현장] 코엑스 팝업마켓 유동인구 미쳤음 (40)', '코엑스 B1 팝업마켓인데 유동인구가 상상 이상이에요.

오전부터 줄 서있었고 오후 2시 기준 매출 50만 넘었어요.

이 정도면 참가비 10만원 아깝지 않네요.', '실시간 행사 현황', 'seller', '조승현', false, 14, NOW() - interval '27 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000034', '[양도] 4/12 홍대 프리마켓 자리 (6)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '남서연', false, 18, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000025', '[양수] 여의도 야시장 자리 구합니다 (72)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '문승우', false, 13, NOW() - interval '4 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000007', '[양도] 4/19 성수 플리마켓 2자리 양도 (55)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '손은서', false, 18, NOW() - interval '7 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000032', '[양수] 제주 핸드메이드 페어 자리 (41)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '강승우', false, 19, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000026', '[양도] 4/19 인천 송도 마켓 양도 (85)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '주민서', false, 48, NOW() - interval '21 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000075', '[양도] 4/12 홍대 프리마켓 자리 (19)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '홍대라이프', false, 29, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '[양수] 여의도 야시장 자리 구합니다 (32)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '임지안', false, 25, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '[양도] 4/19 성수 플리마켓 2자리 양도 (91)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'foodtruck', '와플장인', false, 10, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000014', '[양수] 제주 핸드메이드 페어 자리 (26)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '황하준', false, 20, NOW() - interval '8 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000017', '[양도] 4/19 인천 송도 마켓 양도 (65)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '류하윤', false, 33, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '[양도] 4/12 홍대 프리마켓 자리 (73)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '임지안', false, 36, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000053', '[양수] 여의도 야시장 자리 구합니다 (69)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '정현우', false, 28, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000071', '[양도] 4/19 성수 플리마켓 2자리 양도 (85)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '한남동', false, 12, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000098', '[양수] 제주 핸드메이드 페어 자리 (59)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'foodtruck', '부산셀러', false, 16, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000019', '[양도] 4/19 인천 송도 마켓 양도 (81)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '양연우', false, 21, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000099', '[양도] 4/12 홍대 프리마켓 자리 (72)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'foodtruck', '와플장인', false, 43, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000037', '[양수] 여의도 야시장 자리 구합니다 (74)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '성지우', false, 20, NOW() - interval '18 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000067', '[양도] 4/19 성수 플리마켓 2자리 양도 (48)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '나다은', false, 35, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000076', '[양수] 제주 핸드메이드 페어 자리 (8)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'foodtruck', '스무디트럭', false, 2, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '[양도] 4/19 인천 송도 마켓 양도 (2)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '임지안', false, 48, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000027', '[양도] 4/12 홍대 프리마켓 자리 (7)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '임지안', false, 25, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000029', '[양수] 여의도 야시장 자리 구합니다 (34)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '김시은', false, 0, NOW() - interval '29 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000088', '[양도] 4/19 성수 플리마켓 2자리 양도 (29)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'foodtruck', '성수감성', false, 27, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000052', '[양수] 제주 핸드메이드 페어 자리 (43)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '오은우', false, 25, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000080', '[양도] 4/19 인천 송도 마켓 양도 (71)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'foodtruck', '이태원감성', false, 28, NOW() - interval '2 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000044', '[양도] 4/12 홍대 프리마켓 자리 (26)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '곽은서', false, 4, NOW() - interval '10 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000061', '[양수] 여의도 야시장 자리 구합니다 (57)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '정지안', false, 45, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000036', '[양도] 4/19 성수 플리마켓 2자리 양도 (15)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '황서윤', false, 50, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000077', '[양수] 제주 핸드메이드 페어 자리 (27)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'foodtruck', '떡볶이천국', false, 38, NOW() - interval '16 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000001', '[양도] 4/19 인천 송도 마켓 양도 (17)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '백하윤', false, 2, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000034', '[양도] 4/12 홍대 프리마켓 자리 (87)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '남서연', false, 8, NOW() - interval '6 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000011', '[양수] 여의도 야시장 자리 구합니다 (24)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '성건우', false, 16, NOW() - interval '25 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '[양도] 4/19 성수 플리마켓 2자리 양도 (23)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'foodtruck', '일상공유', false, 22, NOW() - interval '30 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000004', '[양수] 제주 핸드메이드 페어 자리 (52)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '정연우', false, 42, NOW() - interval '26 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000026', '[양도] 4/19 인천 송도 마켓 양도 (23)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '주민서', false, 26, NOW() - interval '15 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000080', '[양도] 4/12 홍대 프리마켓 자리 (57)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'foodtruck', '이태원감성', false, 50, NOW() - interval '23 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000092', '[양수] 여의도 야시장 자리 구합니다 (85)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'foodtruck', '한남동', false, 47, NOW() - interval '3 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000040', '[양도] 4/19 성수 플리마켓 2자리 양도 (46)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'seller', '이아린', false, 34, NOW() - interval '12 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000049', '[양수] 제주 핸드메이드 페어 자리 (16)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '유유준', false, 34, NOW() - interval '28 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000022', '[양도] 4/19 인천 송도 마켓 양도 (81)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'seller', '남태윤', false, 46, NOW() - interval '17 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000020', '[양도] 4/12 홍대 프리마켓 자리 (76)', '급한 일정으로 4/12 홍대 프리마켓 자리 양도합니다.

참가비 3만원 그대로.
좋은 위치에요.

관심 있으신 분 댓글 주세요.', '행사 양도/양수', 'seller', '류승현', false, 42, NOW() - interval '9 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000066', '[양수] 여의도 야시장 자리 구합니다 (6)', '4월 여의도 밤도깨비야시장 자리 양수 원합니다.

모집 마감되어서 못 들어갔어요 ㅠㅠ

양도하시는 분 연락 주세요!', '행사 양도/양수', 'seller', '오수아', false, 44, NOW() - interval '14 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000087', '[양도] 4/19 성수 플리마켓 2자리 양도 (8)', '친구와 2자리 신청했는데 일정이 안 맞아서 양도합니다.

2자리 함께 or 1자리만 가능.
참가비: 4만원/자리

DM 주세요.', '행사 양도/양수', 'foodtruck', '일상공유', false, 11, NOW() - interval '11 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000038', '[양수] 제주 핸드메이드 페어 자리 (33)', '4/25~27 제주 핸드메이드 페어 자리 구합니다.

1일만이라도 괜찮아요.
판매 품목: 도자기 (깨지지 않게 잘 포장합니다)

연락처 댓글로 남겨주세요.', '행사 양도/양수', 'seller', '나승현', false, 12, NOW() - interval '1 days');
INSERT INTO public.posts (user_id, title, content, category, seller_type, author, is_anonymous, likes, created_at) VALUES ('f1000000-0000-0000-0000-000000000086', '[양도] 4/19 인천 송도 마켓 양도 (47)', '인천 송도 글로벌마켓 자리 양도합니다.

참가비 55,000원 그대로.
자리 위치: 수변광장 B-7

빠른 연락 부탁드려요!', '행사 양도/양수', 'foodtruck', '인천마켓', false, 48, NOW() - interval '11 days');

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
