'use client';

import React from 'react';

import { motion } from 'framer-motion';

const AsideMediaEffectsOptionComponent = () =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-x-hidden pb-6'>
            Media Effects
        </motion.div>
    );
};

export default AsideMediaEffectsOptionComponent;
