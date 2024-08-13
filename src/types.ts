type Skill = {
    name: string
    score: number
}

type Experience = {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
}

type Education = {
    degree: string
    major: string
    university?: string
    school?: string
    location: string
    startDate: string
    endDate: string
    description: string
}

type Certification = {
    name: string
    date: string
}

export type Resume = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    experiences: Array<Experience>
    education: Array<Education>
    certifications: Array<Certification>
    description: string
    references: Array<string>
    linkedin: string
    skills: Array<Skill>
    title?: string
}

export type LayoutStyles = {
    fontSize: string
    color: string
    fontFamily: string
    layout: 'row' | 'col'
    alignment: 'left' | 'center' | 'right'
}

export type SaveResumeProps = {
    draft: Resume
    watermark: WatermarkStyle
    layoutTitles: Array<string>
    styles: LayoutStyles
    layoutName?: string
    redirectTo?: string
}

export type WatermarkStyle = {
    fontSize?: string
    fontColor?: string
    fontFamily?: string
    opacity: number
    watermarkText: string
}

export type ResumeData = {
    id: string
    user_id: string
    layout_name: string
    data: Resume
    styles: LayoutStyles
    watermark: WatermarkStyle
    created_at: string
    updated_at: string
    layout: Array<string>
    is_template: boolean
}
