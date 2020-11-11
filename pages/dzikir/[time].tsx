import { Box } from '@chakra-ui/core';
import DzikrItem from '@components/dzikrItem/dzikrItem';
import { useDzikr, IDzikrData } from 'api/useDzikr';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

const Index: NextPage = () => {
  const { data } = useDzikr();

  return (
    <>
      <NextSeo title="Dzikrr" description="Aplikasi Dzikir Pagi dan Petang" />

      <Box pos="relative">
        {data?.map((item) => {
          if (item.data.arabic.indexOf('@') > 0) {
            const arabics: string[] = item.data.arabic.split('@');
            const narrators: string[] = item.data.narrator.split('@');
            const translatedIds: string[] = item.data.translated_id.split('@');

            return (
              <Box _even={{ bgColor: 'rgba(251, 240, 218, 0.24)' }}>
                {arabics.map((arabic, index) => (
                  <DzikrItem
                    noTitle={index > 0}
                    noFaedah={index < arabics.length - 1}
                    data={
                      {
                        ...item.data,
                        arabic,
                        narrator: narrators[index],
                        translated_id: translatedIds[index],
                      } as IDzikrData
                    }
                    key={item.id}
                    borderBottom={0}
                    _last={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                  />
                ))}
              </Box>
            );
          } else {
            return (
              <DzikrItem
                data={item.data as IDzikrData}
                key={item.id}
                _even={{ bgColor: 'rgba(251, 240, 218, 0.24)' }}
              />
            );
          }
        })}
      </Box>
    </>
  );
};

export default Index;
