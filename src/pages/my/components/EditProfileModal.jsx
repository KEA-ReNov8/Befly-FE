import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema } from '@login/feature/schema';
import { useProfileImageMutation } from '@my/feature/hook/mutation/useProfileImageMutation';
import { useProfileNicknameMutation } from '@my/feature/hook/mutation/useProfileNicknameMutation';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { uploadImage } from '@login/feature/utils/uploadImage';
import Message from '@login/components/Message';
import { useQueryClient } from '@tanstack/react-query';
import defaultImage from '@shared/assets/icons/defaultUser.svg';
import logo from '../../../../public/favicon.svg';

const EditProfileModal = ({ onClose }) => {
    const { myInfo, setMyInfo } = useMyInfoStore();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(myInfo?.profileImageUrl || logo);
    const [isUploading, setIsUploading] = useState(false);
    const queryClient = useQueryClient();
    const [uploadError, setUploadError] = useState('');

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(ProfileSchema),
        mode: 'onChange',

        defaultValues: {
            nickName: myInfo?.nickName || ''
        }
    });

    const profileImageMutation = useProfileImageMutation();
    const profileNicknameMutation = useProfileNicknameMutation();

    const nickName = watch('nickName');

    useEffect(() => {
        if (myInfo?.nickName) {
            setValue('nickName', myInfo.nickName);
        }
        if (myInfo?.profileImg) {
            setPreviewUrl('');
        }
    }, [myInfo, setValue]);

    // 파일 선택 핸들러
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            
            // 미리보기 URL 생성
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // + 버튼 클릭 시 파일 선택 다이얼로그 열기
    const handleAddButtonClick = () => {
        fileInputRef.current?.click();
    };

    // 폼 제출 핸들러
    const onSubmit = async (formData) => {
        setIsUploading(true);
        setUploadError('');

        try {
            const promises = [];
            let uploadedImageUrl = null;

            // 이미지가 변경된 경우 업로드
            if (selectedFile) {
                const imageUploadPromise = async () => {
                    const blobURL = URL.createObjectURL(selectedFile);
                    const imageUrl = await uploadImage(blobURL, selectedFile);
                    console.log('이미지 업로드 결과:', imageUrl);
                    if (!imageUrl) {
                        throw new Error('이미지 업로드에 실패했습니다.');
                    }

                    uploadedImageUrl = imageUrl; // 상위 스코프에 저장
                    return profileImageMutation.mutateAsync(imageUrl);
                };
                promises.push(imageUploadPromise());
            }

            // 닉네임이 변경된 경우 업데이트
            if (nickName !== myInfo?.nickName) {
                promises.push(
                    profileNicknameMutation.mutateAsync(nickName)
                );
            }

            // 모든 업데이트 실행
            if (promises.length > 0) {
                await Promise.all(promises);
                
                // 프로필 쿼리 다시 가져오기
                await queryClient.invalidateQueries(['profile']);
                
                // 로컬 스토어 업데이트
                const updatedInfo = {
                    ...myInfo,
                    nickName: nickName,
                    ...(uploadedImageUrl && { profileImg: uploadedImageUrl })
                };
                setMyInfo(updatedInfo);
            }

            onClose();
        } catch (error) {
            console.error('프로필 수정 실패:', error);
            setUploadError(error.message || '프로필 수정에 실패했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <ModalOverlay>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Profile>
                    <ProfileImage src={previewUrl} />
                    <AddButton onClick={handleAddButtonClick} disabled={isUploading}>+</AddButton>
                    <HiddenFileInput
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </Profile>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input>
                        <Nickname 
                            type="text" 
                            placeholder="닉네임" 
                            maxLength={10} 
                            {...register('nickName')}
                        />
                    </Input>
                    <Message isValid={!errors.nickName} message={errors.nickName?.message} />
                    <ButtonContainer>
                        <ReturnButton type="button" onClick={onClose} disabled={isUploading}>
                            취소
                        </ReturnButton>
                        <EditButton 
                            type="submit" 
                            disabled={!isValid || isUploading || (nickName === myInfo?.nickName && !selectedFile)}
                        >
                            {isUploading ? '수정 중...' : '수정하기'}
                        </EditButton>
                    </ButtonContainer>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 344px;
    height: 513px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.gray[400]};
    background-color: white;
`;

const Profile = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
    width: 230px;
    height: 230px;
    border-radius: 50%;
    background-color: ${theme.colors.gray[300]};
`;

const AddButton = styled.button`
    position: absolute;
    top: 80%;
    left: 78%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${theme.colors.green.main};
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
    padding-bottom: 0.2rem;

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const Input = styled.div`
    display: flex;
    position: relative;
    width: 282px;
    height: 53px;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    gap: 1rem;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 8px;
    margin-bottom: 8px;

    &:focus-within {
        border-color: ${theme.colors.green.main};
    }
`;

const Nickname = styled.input`
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};

    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 1.5rem;
    gap: 15px;
`;

const EditButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: ${props => props.disabled ? theme.colors.gray[400] : theme.colors.green.main};
    color: white;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: ${theme.colors.green.hover};
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const ReturnButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid ${theme.colors.gray[400]};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: ${theme.colors.gray[100]};
    }
    &:disabled {
        cursor: not-allowed;
        background-color: ${theme.colors.gray[200]};
    }
`;

export default EditProfileModal;
