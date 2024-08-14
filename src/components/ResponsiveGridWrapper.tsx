import React, { memo, useMemo } from 'react'
import { Grid, GridItem, Tabs, TabList, Tab, TabPanels, TabPanel, useMediaQuery } from '@chakra-ui/react'

type ResponsiveGridWrapperProps = {
    children: React.ReactNode
}

const DesktopView: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
    <Grid templateColumns="repeat(10, 1fr)" gap={4} p={4}>
        {React.Children.map(children, (child, index) => (
            <GridItem colSpan={index === 0 ? 4 : 6}>{child}</GridItem>
        ))}
    </Grid>
))

const MobileView: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
    <Tabs isManual>
        <TabList>
            <Tab>Forms</Tab>
            <Tab>Layout</Tab>
        </TabList>
        <TabPanels>
            {React.Children.map(children, (child, index) => (
                <TabPanel key={index}>{child}</TabPanel>
            ))}
        </TabPanels>
    </Tabs>
))

export const ResponsiveGridWrapper: React.FC<ResponsiveGridWrapperProps> = memo(({ children }) => {
    const [isMobile] = useMediaQuery('(max-width: 48em)')

    const View = useMemo(() => (isMobile ? MobileView : DesktopView), [isMobile])

    return <View>{children}</View>
})
