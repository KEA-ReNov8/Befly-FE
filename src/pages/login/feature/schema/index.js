import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const UserInfoSchema = z.object({
    nickName: z
        .string()
        .min(1, "닉네임을 입력해주세요.")
        .max(12)
        .regex(/^[a-zA-Z0-9가-힣\s]+$/, '닉네임에 특수문자를 포함할 수 없습니다.')
        .refine((value) => value.trim() !== '', '닉네임은 공백만 입력할 수 없습니다.')
        .refine((value) => value.trimStart() === value, '닉네임은 첫 글자가 공백일 수 없습니다.'),
    clientId: z
        .string()
        .email('올바른 이메일 형식이 아닙니다.'),
    password: z
        .string()
        .min(6, '비밀번호는 6자 이상이어야 합니다.')
        .nonempty('비밀번호를 입력해주세요.'),
    passwordConfirm: z
        .string()
        .nonempty('비밀번호를 입력해주세요.')
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다.',
});

export const SocialUserInfoSchema = z.object({
    clientId: z
        .string()
        .nonempty('고유값 오류 발생'),
    nickName: z
        .string()
        .min(1, "닉네임을 입력해주세요.")
        .max(12)
        .regex(/^[a-zA-Z0-9가-힣\s]+$/, '닉네임에 특수문자를 포함할 수 없습니다.')
        .refine((value) => value.trim() !== '', '닉네임은 공백만 입력할 수 없습니다.')
        .refine((value) => value.trimStart() === value, '닉네임은 첫 글자가 공백일 수 없습니다.'),
});

export const LoginSchema = z.object({
    clientId: z
        .string()
        .email('올바른 이메일 형식이 아닙니다.'),
    password: z
        .string()
        .min(6, '비밀번호는 6자 이상이어야 합니다.')
        .nonempty('비밀번호를 입력해주세요.'),
});

export const ImageSchema = z.object({
    image: z
        .any()
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            'jpeg, jpg, png, webp만 업로드 가능합니다.',
        )
        .optional(),
    previewImage: z
        .string()
        .optional(),
});

/*export const VerifyEmailSchema = z.object({
    code: z
        .string()
        .min(6, '인증번호는 6자리 이상이어야 합니다.')
        .max(6, '인증번호는 6자리 이하이어야 합니다.'),
});*/
