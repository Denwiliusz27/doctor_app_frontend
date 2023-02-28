package com.daniel.doctorappbackend.medicalservice.model;

import com.daniel.doctorappbackend.specialization.model.SpecializationEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;

@Data
@Entity
@Table(name = "services")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MedicalServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "length_of_visit")
    private Time lengthOfVisit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id")
    private SpecializationEntity specialization;
}
