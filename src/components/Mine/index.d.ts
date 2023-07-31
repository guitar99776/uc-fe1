/*
 * @Author: Lin Yunhe
 * @Date: 2023-06-30 14:22:37
 * @LastEditors: Lin Yunhe
 * @LastEditTime: 2023-07-17 15:08:21
 */
// 该枚举值不可更改，与后端返回值匹配
export enum AnchorEnum {
    BASE_INFO = 'BASE_INFO',
    EDUCATION_EXPERIENCE = 'EDU_EXPERIENCE',
    WORK_EXPERIENCE = 'SOCIAL_EXPERIENCE',
    PROJECT_EXPERIENCE = 'PROJECT_EXPERIENCE',
    REWARD_PUNISHMENT = 'REWARD_PUNISH_INFO',
    QUALIFICATION_CERTIFICATE = 'QUALIFICATION_CERTIFICATE',
    TRAINING_EXPERIENCE = 'TRAINING_EXPERIENCE',
    LECTURER_RECORD = 'LECTURER_RECORD',
    PERFORMANCE = 'PERFORMANCE',
    LANGUAGE_ABILITY = 'LANGUAGE',
    FAMILY_MEMBERS = 'FAMILY_MEMBER',
    CONTACT_ADDRESS = 'ADDRESS',
    IDENTITY_INFO = 'IDENTITY_INFO',
}

export enum AnchorEnumText {
    BASE_INFO = '基本信息',
    EDU_EXPERIENCE = '教育经历',
    SOCIAL_EXPERIENCE = '社会工作经历',
    PROJECT_EXPERIENCE = '项目经历',
    REWARD_PUNISH_INFO = '奖惩信息',
    QUALIFICATION_CERTIFICATE = '资质证书',
    TRAINING_EXPERIENCE = '培训经历',
    LECTURER_RECORD = '讲师任职记录',
    PERFORMANCE = '绩效表现',
    LANGUAGE = '语言能力',
    FAMILY_MEMBER = '家庭成员',
    ADDRESS = '联系地址',
    IDENTITY_INFO = '身份信息',
}

// 子编辑表单参数
export interface EditFormProps {
    // 编辑、审核查看、审核
    type?: 'EDIT' | 'AUDIT_VIEW' | 'AUDIT';
    refresh?: () => void;
    value?: any;
    /** 修改的字段 */
    changeFields?: string;
}

export interface EducationalExperience {
    guid?: string;
    graduationSchool?: string;
    country?: string;
    startDate?: string;
    endDate?: string;
    major?: string;
    learningStyle?: string;
    learningForm?: number;
    educationalSystem?: number;
    academic?: string;
    degree?: string;
    academicCertificateNum?: string;
    academicDate?: string;
    degreeCertificatesNum?: string;
    degreeDate?: string;
    highestAcademic?: string;
    highestDegree?: string;
}

export interface WorkExperience {
    guid: string;
    startDate?: string;
    endDate?: string;
    employerName?: string;
    country?: string;
    city?: string;
    department?: string;
    previousPosition?: string;
    workPerformance?: string;
    leavingReason?: string;
    certifier?: string;
    certifierPhone?: string;
}

export interface Qualifications {
    guid?: string;
    startDate?: string;
    endDate?: string;
    certificateName?: string;
    assessUnit?: string;
    certificateNum?: string;
    certificateAttachUrl?: string;
    certificateAttachName?: string;
    currentDataHandleType?: 'INSERT' | 'MODIFY' | 'DELETE';
}

export interface TrainingExperience {
    guid: string;
    startDate?: string;
    endDate?: string;
    trainingCourse?: string;
    trainingInstitution?: string;
    teacher?: string;
    trainingDuration?: number;
    durationUnit?: string;
    certificate: string;
    certificateNum?: string;
    certifyingAuthority?: string;
    trainingScore?: string;
    trainingRemark?: string;
    isInternal?: string;
}

export interface LecturerRecord {
    guid: string;
    startDate?: string;
    endDate?: string;
    trainingClass?: string;
    trainingDuration?: number;
    durationUnit?: string;
    certifyingAuthority?: string;
    certificateName?: string;
    certificateNum?: string;
    trainingRemark?: string;
    licenseAgency?: string;
}

export interface LanguageAbility {
    guid: string;
    language?: string;
    level?: string;
}

export interface FamilyMembersType {
    guid: string;
    memberFamilyName?: string;
    memberFirstname?: string;
    gender?: '1' | '2';
    relation?: string;
    emergencyContact?: 'X' | '';
    phoneNum?: string;
    isInCompany?: 'X' | '';
    companyName?: string;
    position?: string;
    birthDate?: string;
    currentDataHandleType?: 'INSERT' | 'MODIFY' | 'DELETE';
}

export type HandleType = 'INSERT' | 'MODIFY' | 'DELETE';

export const ColorMarkMap: Record<HandleType, string> = {
    MODIFY: '#F9F9DC',
    DELETE: '#F9CCBE',
    INSERT: '#D1F5D9',
};
