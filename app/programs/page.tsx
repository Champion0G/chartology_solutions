'use client';
import Programs from '@/components/Programs';
import Curriculum from '@/components/Curriculum';
import Certification from '@/components/Certification';

export default function ProgramsPage() {
    return (
        <div style={{ paddingTop: '100px', minHeight: 'calc(100vh - 300px)' }}>
            <Programs />
            <Curriculum />
            <Certification />
        </div>
    );
}
