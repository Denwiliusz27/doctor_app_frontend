package com.daniel.doctorappbackend.initdata;

import com.daniel.doctorappbackend.city.model.CityEntity;
import com.daniel.doctorappbackend.city.repository.CityRepository;
import com.daniel.doctorappbackend.medicalservice.model.MedicalServiceEntity;
import com.daniel.doctorappbackend.medicalservice.repository.MedicalServiceRepository;
import com.daniel.doctorappbackend.specialization.repository.SpecializationRepository;
import com.daniel.doctorappbackend.specialization.model.SpecializationEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Time;

@Component
@RequiredArgsConstructor
public class DemoData implements CommandLineRunner {
    private final SpecializationRepository specializationRepository;
    private final CityRepository cityRepository;
    private final MedicalServiceRepository medicalServiceRepository;

    @Override
    public void run(String... args) throws Exception {
        if(specializationRepository.count() == 0) {
            SpecializationEntity internista = specializationRepository.save(SpecializationEntity.builder().name("internista").build());
            SpecializationEntity stomatolog = specializationRepository.save(SpecializationEntity.builder().name("stomatolog").build());
            SpecializationEntity kardiolog = specializationRepository.save(SpecializationEntity.builder().name("kardiolog").build());
            SpecializationEntity neurolog = specializationRepository.save(SpecializationEntity.builder().name("neurolog").build());
            SpecializationEntity laryngolog = specializationRepository.save(SpecializationEntity.builder().name("laryngolog").build());
            SpecializationEntity endokrynolog = specializationRepository.save(SpecializationEntity.builder().name("endokrynolog").build());
            SpecializationEntity ortopeda = specializationRepository.save(SpecializationEntity.builder().name("ortopeda").build());
            SpecializationEntity pielegniarka = specializationRepository.save(SpecializationEntity.builder().name("pielęgniarka laboratoryjna").build());
            SpecializationEntity elektroradiolog = specializationRepository.save(SpecializationEntity.builder().name("elektroradiolog").build());


        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja")
                .specialization(internista)
            .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja stomatologiczna")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("leczenie próchnicy")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("usuwanie zęba")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("leczenie kanałowe")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("odbudowa zębów")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("wybielanie zębów")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("usuwanie kamienia")
                .specialization(stomatolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja kardiologiczna")
                .specialization(kardiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("EKG")
                .specialization(kardiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("echo serca")
                .specialization(kardiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("holter")
                .specialization(kardiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja neurologiczna")
                .specialization(neurolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja laryngologiczna")
                .specialization(laryngolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("badanie słuchu")
                .specialization(laryngolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("płukanie uszu")
                .specialization(laryngolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("punkcja zatok")
                .specialization(laryngolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja endokrynologiczna")
                .specialization(endokrynolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("USG tarczycy")
                .specialization(endokrynolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("konsultacja ortopedyczna")
                .specialization(ortopeda)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("USG aparatu ruchu")
                .specialization(ortopeda)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("iniekcja")
                .specialization(ortopeda)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("podstawowe badania krwi")
                .specialization(pielegniarka)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("podstawowe badania moczu i kału")
                .specialization(pielegniarka)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("badanie poziomu hormonów z krwi")
                .specialization(pielegniarka)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("rezonans magnetyczny")
                .specialization(elektroradiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("badanie poziomu hormonów z krwi")
                .specialization(elektroradiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("tomografia komputerowa")
                .specialization(elektroradiolog)
                .build());
        medicalServiceRepository.save(MedicalServiceEntity.builder()
                .name("RTG")
                .specialization(elektroradiolog)
                .build());
        }

        if(cityRepository.count() == 0) {
            cityRepository.save(CityEntity.builder().name("Kraków").build());
            cityRepository.save(CityEntity.builder().name("Warszawa").build());
            cityRepository.save(CityEntity.builder().name("Gdańsk").build());
        }
    }
}
